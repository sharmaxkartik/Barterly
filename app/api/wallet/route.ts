import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  addDoc,
  updateDoc,
  runTransaction,
  limit,
} from "firebase/firestore";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Get wallet balance and transaction history
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const searchParams = new URL(req.url).searchParams;
    const includeTransactions = searchParams.get("transactions") === "true";
    const limitCount = parseInt(searchParams.get("limit") || "50");

    // Get user's wallet data
    const userDoc = await getDoc(doc(db, "users", userId));
    if (!userDoc.exists()) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const userData = userDoc.data();
    const wallet = {
      balance: userData.hourBalance || 0,
      totalEarned: userData.totalEarned || 0,
      totalSpent: userData.totalSpent || 0,
      pendingEarnings: userData.pendingEarnings || 0,
    };

    if (includeTransactions) {
      // Get transaction history
      const transactionsQuery = query(
        collection(db, "transactions"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc"),
        limit(limitCount)
      );

      const transactionsSnapshot = await getDocs(transactionsQuery);
      const transactions = transactionsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return NextResponse.json({
        wallet,
        transactions,
      });
    }

    return NextResponse.json({ wallet });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Process a transaction (transfer hours/credits)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const {
      type,
      amount,
      recipientId,
      sessionId,
      exchangeId,
      description,
      metadata,
    } = await req.json();

    if (!type || !amount) {
      return NextResponse.json(
        { success: false, message: "type and amount are required" },
        { status: 400 }
      );
    }

    // Validate transaction type
    const validTypes = [
      "session_payment",
      "session_earning",
      "exchange_completion",
      "bonus",
      "penalty",
      "transfer",
      "withdrawal",
      "deposit",
    ];

    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { success: false, message: "Invalid transaction type" },
        { status: 400 }
      );
    }

    // For transfers, require recipientId
    if (type === "transfer" && !recipientId) {
      return NextResponse.json(
        { success: false, message: "recipientId is required for transfers" },
        { status: 400 }
      );
    }

    // Run transaction atomically
    const transactionResult = await runTransaction(db, async (transaction) => {
      const userRef = doc(db, "users", userId);
      const userDoc = await transaction.get(userRef);

      if (!userDoc.exists()) {
        throw new Error("User not found");
      }

      const userData = userDoc.data();
      const currentBalance = userData.hourBalance || 0;

      // For debits, check if user has sufficient balance
      const isDebit = [
        "session_payment",
        "transfer",
        "withdrawal",
        "penalty",
      ].includes(type);
      if (isDebit && currentBalance < amount) {
        throw new Error("Insufficient balance");
      }

      // Calculate new balance
      const newBalance = isDebit
        ? currentBalance - amount
        : currentBalance + amount;

      // Update user balance
      const userUpdates: any = {
        hourBalance: newBalance,
        updatedAt: new Date().toISOString(),
      };

      if (isDebit) {
        userUpdates.totalSpent = (userData.totalSpent || 0) + amount;
      } else {
        userUpdates.totalEarned = (userData.totalEarned || 0) + amount;
      }

      transaction.update(userRef, userUpdates);

      // If transfer, update recipient's balance
      if (type === "transfer" && recipientId) {
        const recipientRef = doc(db, "users", recipientId);
        const recipientDoc = await transaction.get(recipientRef);

        if (!recipientDoc.exists()) {
          throw new Error("Recipient not found");
        }

        const recipientData = recipientDoc.data();
        const recipientNewBalance = (recipientData.hourBalance || 0) + amount;

        transaction.update(recipientRef, {
          hourBalance: recipientNewBalance,
          totalEarned: (recipientData.totalEarned || 0) + amount,
          updatedAt: new Date().toISOString(),
        });

        // Create transaction record for recipient
        const recipientTransactionRef = doc(collection(db, "transactions"));
        transaction.set(recipientTransactionRef, {
          userId: recipientId,
          type: "transfer_received",
          amount,
          fromUserId: userId,
          sessionId: sessionId || null,
          exchangeId: exchangeId || null,
          description:
            description || `Transfer received from ${session.user.name}`,
          metadata: metadata || {},
          balanceAfter: recipientNewBalance,
          status: "completed",
          createdAt: new Date().toISOString(),
        });
      }

      // Create transaction record
      const transactionRef = doc(collection(db, "transactions"));
      transaction.set(transactionRef, {
        userId,
        type,
        amount,
        recipientId: recipientId || null,
        sessionId: sessionId || null,
        exchangeId: exchangeId || null,
        description: description || `${type.replace("_", " ")} transaction`,
        metadata: metadata || {},
        balanceAfter: newBalance,
        status: "completed",
        createdAt: new Date().toISOString(),
      });

      return {
        transactionId: transactionRef.id,
        newBalance,
        amount,
        type,
      };
    });

    return NextResponse.json({
      success: true,
      message: "Transaction completed successfully",
      transaction: transactionResult,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Get transaction details
export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { transactionId } = await req.json();

    if (!transactionId) {
      return NextResponse.json(
        { success: false, message: "Transaction ID is required" },
        { status: 400 }
      );
    }

    const transactionDoc = await getDoc(doc(db, "transactions", transactionId));

    if (!transactionDoc.exists()) {
      return NextResponse.json(
        { success: false, message: "Transaction not found" },
        { status: 404 }
      );
    }

    const transactionData = transactionDoc.data();

    // Check if user is authorized to view this transaction
    if (
      transactionData.userId !== session.user.id &&
      transactionData.recipientId !== session.user.id
    ) {
      return NextResponse.json(
        { success: false, message: "Unauthorized to view this transaction" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      transaction: {
        id: transactionDoc.id,
        ...transactionData,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
