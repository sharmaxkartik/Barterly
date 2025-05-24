import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  addDoc,
  updateDoc,
  deleteDoc,
  limit,
} from "firebase/firestore";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Get notifications for current user
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
    const unreadOnly = searchParams.get("unreadOnly") === "true";
    const limitCount = parseInt(searchParams.get("limit") || "50");

    let notificationsQuery = query(
      collection(db, "notifications"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
      limit(limitCount)
    );

    if (unreadOnly) {
      notificationsQuery = query(
        collection(db, "notifications"),
        where("userId", "==", userId),
        where("read", "==", false),
        orderBy("createdAt", "desc"),
        limit(limitCount)
      );
    }

    const snapshot = await getDocs(notificationsQuery);
    const notifications = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ notifications });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Create a new notification (system use)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { userId, type, title, message, data, actionUrl } = await req.json();

    if (!userId || !type || !title || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "userId, type, title, and message are required",
        },
        { status: 400 }
      );
    }

    const newNotification = {
      userId,
      type, // 'exchange_request', 'exchange_accepted', 'exchange_completed', 'review_received', 'message', 'system'
      title,
      message,
      data: data || {},
      actionUrl: actionUrl || null,
      read: false,
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(
      collection(db, "notifications"),
      newNotification
    );

    return NextResponse.json({
      success: true,
      message: "Notification created successfully",
      id: docRef.id,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Mark notifications as read
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
    const { notificationIds, markAllAsRead } = await req.json();

    if (markAllAsRead) {
      // Mark all notifications as read for the user
      const notificationsQuery = query(
        collection(db, "notifications"),
        where("userId", "==", userId),
        where("read", "==", false)
      );

      const snapshot = await getDocs(notificationsQuery);
      const updatePromises = snapshot.docs.map((doc) =>
        updateDoc(doc.ref, { read: true, readAt: new Date().toISOString() })
      );

      await Promise.all(updatePromises);

      return NextResponse.json({
        success: true,
        message: "All notifications marked as read",
        updated: snapshot.docs.length,
      });
    } else if (notificationIds && Array.isArray(notificationIds)) {
      // Mark specific notifications as read
      const updatePromises = notificationIds.map((id: string) =>
        updateDoc(doc(db, "notifications", id), {
          read: true,
          readAt: new Date().toISOString(),
        })
      );

      await Promise.all(updatePromises);

      return NextResponse.json({
        success: true,
        message: "Notifications marked as read",
        updated: notificationIds.length,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Either notificationIds or markAllAsRead is required",
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Delete notifications
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
    const notificationId = searchParams.get("id");

    if (!notificationId) {
      return NextResponse.json(
        { success: false, message: "Notification ID is required" },
        { status: 400 }
      );
    }

    // Verify the notification belongs to the user
    const notificationRef = doc(db, "notifications", notificationId);
    const notificationDoc = await getDocs(
      query(collection(db, "notifications"), where("userId", "==", userId))
    );

    if (notificationDoc.empty) {
      return NextResponse.json(
        { success: false, message: "Notification not found or unauthorized" },
        { status: 404 }
      );
    }

    await deleteDoc(notificationRef);

    return NextResponse.json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
