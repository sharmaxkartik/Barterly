import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  setDoc,
  updateDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Get all exchanges or filtered
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
    const filter = searchParams.get("filter") || "all";

    const exchangesCollection = collection(db, "exchanges");
    let exchangesQuery;

    if (filter === "mine") {
      exchangesQuery = query(
        exchangesCollection,
        where("creatorId", "==", userId)
      );
    } else if (filter === "myskills") {
      // Get user's skills
      const userDoc = await getDoc(doc(db, "users", userId));
      const userData = userDoc.data();
      const userSkills = userData?.skills || [];

      if (userSkills.length > 0) {
        exchangesQuery = query(
          exchangesCollection,
          where("lookingFor", "in", userSkills)
        );
      } else {
        exchangesQuery = exchangesCollection;
      }
    } else {
      exchangesQuery = exchangesCollection;
    }

    const snapshot = await getDocs(exchangesQuery);
    const exchanges = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ exchanges });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Create a new exchange request
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
      title,
      lookingFor,
      offering,
      timeNeeded,
      timeOffered,
      description,
    } = await req.json();

    const newExchange = {
      creatorId: userId,
      creatorName: session.user.name || "Anonymous",
      title,
      lookingFor,
      offering,
      timeNeeded,
      timeOffered,
      description,
      status: "open",
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, "exchanges"), newExchange);

    return NextResponse.json({
      success: true,
      message: "Exchange request created successfully",
      id: docRef.id,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Update an exchange request
export async function PUT(req: Request) {
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
      id,
      title,
      lookingFor,
      offering,
      timeNeeded,
      timeOffered,
      description,
      status,
    } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Exchange ID is required" },
        { status: 400 }
      );
    }

    // Check if user owns this exchange
    const exchangeRef = doc(db, "exchanges", id);
    const exchangeDoc = await getDoc(exchangeRef);

    if (!exchangeDoc.exists()) {
      return NextResponse.json(
        { success: false, message: "Exchange not found" },
        { status: 404 }
      );
    }

    const exchangeData = exchangeDoc.data();
    if (exchangeData.creatorId !== userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized to update this exchange" },
        { status: 403 }
      );
    }

    const updateData: any = {
      updatedAt: new Date().toISOString(),
    };

    if (title !== undefined) updateData.title = title;
    if (lookingFor !== undefined) updateData.lookingFor = lookingFor;
    if (offering !== undefined) updateData.offering = offering;
    if (timeNeeded !== undefined) updateData.timeNeeded = timeNeeded;
    if (timeOffered !== undefined) updateData.timeOffered = timeOffered;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;

    await updateDoc(exchangeRef, updateData);

    return NextResponse.json({
      success: true,
      message: "Exchange updated successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Delete an exchange request
export async function DELETE(req: Request) {
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
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Exchange ID is required" },
        { status: 400 }
      );
    }

    // Check if user owns this exchange
    const exchangeRef = doc(db, "exchanges", id);
    const exchangeDoc = await getDoc(exchangeRef);

    if (!exchangeDoc.exists()) {
      return NextResponse.json(
        { success: false, message: "Exchange not found" },
        { status: 404 }
      );
    }

    const exchangeData = exchangeDoc.data();
    if (exchangeData.creatorId !== userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized to delete this exchange" },
        { status: 403 }
      );
    }

    await deleteDoc(exchangeRef);

    return NextResponse.json({
      success: true,
      message: "Exchange deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
