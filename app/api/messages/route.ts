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
  serverTimestamp,
} from "firebase/firestore";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Get conversations for current user
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
    const conversationId = searchParams.get("conversationId");

    // If conversationId is provided, get messages from that conversation
    if (conversationId) {
      const messagesQuery = query(
        collection(db, "conversations", conversationId, "messages"),
        orderBy("timestamp", "asc")
      );

      const snapshot = await getDocs(messagesQuery);
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return NextResponse.json({ messages });
    }

    // Otherwise, get all conversations for the user
    const conversationsQuery = query(
      collection(db, "conversations"),
      where("participants", "array-contains", userId)
    );

    const snapshot = await getDocs(conversationsQuery);
    const conversations = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const convo = doc.data();
        const otherParticipantId = convo.participants.find(
          (id: string) => id !== userId
        ); // Get the other participant's info
        const otherUser = await getDoc(doc(db, "users", otherParticipantId));
        const otherUserData = otherUser.exists() ? otherUser.data() : {};

        // Get the last message
        const messagesQuery = query(
          collection(db, "conversations", doc.id, "messages"),
          orderBy("timestamp", "desc")
        );
        const messagesSnapshot = await getDocs(messagesQuery);
        const lastMessage = messagesSnapshot.docs[0]?.data() || null;

        return {
          id: doc.id,
          otherUser: {
            id: otherParticipantId,
            name: (otherUserData as any)?.displayName || "Unknown User",
          },
          lastMessage: lastMessage
            ? {
                text: lastMessage.text,
                timestamp: lastMessage.timestamp,
                senderId: lastMessage.senderId,
              }
            : null,
          unreadCount: convo.unread?.[userId] || 0,
        };
      })
    );

    return NextResponse.json({ conversations });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Send a new message
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
    const { recipientId, text, conversationId } = await req.json();

    let convoId = conversationId;

    // If no conversationId is provided, create a new conversation
    if (!convoId) {
      // Check if conversation already exists between these users
      // We need to query both possible participant orders since Firestore doesn't support querying arrays with exact content match
      const conversationsQuery1 = query(
        collection(db, "conversations"),
        where("participants", "==", [userId, recipientId])
      );

      const conversationsQuery2 = query(
        collection(db, "conversations"),
        where("participants", "==", [recipientId, userId])
      );
      const [snapshot1, snapshot2] = await Promise.all([
        getDocs(conversationsQuery1),
        getDocs(conversationsQuery2),
      ]);

      const snapshot = {
        empty: snapshot1.empty && snapshot2.empty,
        docs: [...snapshot1.docs, ...snapshot2.docs],
      };

      if (!snapshot.empty) {
        convoId = snapshot.docs[0].id;
      } else {
        // Create new conversation
        const convoRef = await addDoc(collection(db, "conversations"), {
          participants: [userId, recipientId],
          createdAt: serverTimestamp(),
          unread: {
            [recipientId]: 1,
          },
        });

        convoId = convoRef.id;
      }
    } else {
      // Update unread count for the recipient
      const convoRef = doc(db, "conversations", convoId);
      const convoDoc = await getDoc(convoRef);

      if (convoDoc.exists()) {
        const convoData = convoDoc.data();
        const unread = convoData.unread || {};

        await updateDoc(convoRef, {
          unread: {
            ...unread,
            [recipientId]: (unread[recipientId] || 0) + 1,
          },
        });
      }
    }

    // Add message to the conversation
    const messageRef = await addDoc(
      collection(db, "conversations", convoId, "messages"),
      {
        senderId: userId,
        text,
        timestamp: serverTimestamp(),
      }
    );

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
      id: messageRef.id,
      conversationId: convoId,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
