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
  deleteDoc,
} from "firebase/firestore";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Get sessions for current user
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
    const type = searchParams.get("type") || "all"; // "all", "upcoming", "past", "requests"
    const role = searchParams.get("role") || "all"; // "all", "teacher", "student"

    let sessionsQuery;
    const sessionsCollection = collection(db, "sessions");

    if (role === "teacher") {
      sessionsQuery = query(
        sessionsCollection,
        where("teacherId", "==", userId),
        orderBy("scheduledAt", "desc")
      );
    } else if (role === "student") {
      sessionsQuery = query(
        sessionsCollection,
        where("studentId", "==", userId),
        orderBy("scheduledAt", "desc")
      );
    } else {
      // Get sessions where user is either teacher or student
      const teacherQuery = query(
        sessionsCollection,
        where("teacherId", "==", userId)
      );
      const studentQuery = query(
        sessionsCollection,
        where("studentId", "==", userId)
      );

      const [teacherSnapshot, studentSnapshot] = await Promise.all([
        getDocs(teacherQuery),
        getDocs(studentQuery),
      ]);
      const allSessions = [
        ...teacherSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        ...studentSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      ];

      // Filter by type
      const now = new Date();
      let filteredSessions = allSessions;

      if (type === "upcoming") {
        filteredSessions = allSessions.filter(
          (session: any) =>
            new Date(session.scheduledAt) > now &&
            session.status !== "completed" &&
            session.status !== "cancelled"
        );
      } else if (type === "past") {
        filteredSessions = allSessions.filter(
          (session: any) =>
            new Date(session.scheduledAt) < now ||
            session.status === "completed"
        );
      } else if (type === "requests") {
        filteredSessions = allSessions.filter(
          (session: any) =>
            session.status === "pending" || session.status === "requested"
        );
      }

      // Sort by scheduled date
      filteredSessions.sort(
        (a: any, b: any) =>
          new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime()
      );

      return NextResponse.json({ sessions: filteredSessions });
    }

    const snapshot = await getDocs(sessionsQuery);
    let sessions = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })); // Apply type filter
    const now = new Date();
    if (type === "upcoming") {
      sessions = sessions.filter(
        (session: any) =>
          new Date(session.scheduledAt) > now &&
          session.status !== "completed" &&
          session.status !== "cancelled"
      );
    } else if (type === "past") {
      sessions = sessions.filter(
        (session: any) =>
          new Date(session.scheduledAt) < now || session.status === "completed"
      );
    } else if (type === "requests") {
      sessions = sessions.filter(
        (session: any) =>
          session.status === "pending" || session.status === "requested"
      );
    }

    return NextResponse.json({ sessions });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Create a new session request
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
      teacherId,
      skillId,
      exchangeId,
      scheduledAt,
      duration,
      message,
      sessionType, // "exchange" or "paid"
      hourlyRate,
    } = await req.json();

    if (!teacherId || !skillId || !scheduledAt || !duration) {
      return NextResponse.json(
        {
          success: false,
          message: "teacherId, skillId, scheduledAt, and duration are required",
        },
        { status: 400 }
      );
    }

    if (teacherId === userId) {
      return NextResponse.json(
        { success: false, message: "You cannot book a session with yourself" },
        { status: 400 }
      );
    }

    // Get teacher and skill information
    const [teacherDoc, skillDoc] = await Promise.all([
      getDoc(doc(db, "users", teacherId)),
      getDoc(doc(db, "skills", skillId)),
    ]);

    if (!teacherDoc.exists() || !skillDoc.exists()) {
      return NextResponse.json(
        { success: false, message: "Teacher or skill not found" },
        { status: 404 }
      );
    }

    const teacherData = teacherDoc.data();
    const skillData = skillDoc.data();

    // Check if the scheduled time is in the future
    if (new Date(scheduledAt) <= new Date()) {
      return NextResponse.json(
        { success: false, message: "Scheduled time must be in the future" },
        { status: 400 }
      );
    }

    const newSession = {
      teacherId,
      teacherName: teacherData.displayName || teacherData.name || "Unknown",
      studentId: userId,
      studentName: session.user.name || "Unknown",
      skillId,
      skillTitle: skillData.title,
      exchangeId: exchangeId || null,
      scheduledAt,
      duration: parseInt(duration),
      sessionType: sessionType || "exchange",
      hourlyRate: hourlyRate || skillData.hourlyRate || 0,
      totalCost:
        sessionType === "paid"
          ? (hourlyRate || skillData.hourlyRate || 0) * (duration / 60)
          : 0,
      message: message || "",
      status: "requested", // "requested", "confirmed", "in_progress", "completed", "cancelled"
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, "sessions"), newSession);

    // Create notification for teacher
    await addDoc(collection(db, "notifications"), {
      userId: teacherId,
      type: "session_request",
      title: "New Session Request",
      message: `${session.user.name} has requested a session for ${skillData.title}`,
      data: {
        sessionId: docRef.id,
        studentId: userId,
        skillId,
      },
      actionUrl: `/sessions/${docRef.id}`,
      read: false,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Session request created successfully",
      id: docRef.id,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Update session status or details
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
    const { id, status, scheduledAt, duration, message, meetingLink, notes } =
      await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Session ID is required" },
        { status: 400 }
      );
    }

    // Get session document
    const sessionRef = doc(db, "sessions", id);
    const sessionDoc = await getDoc(sessionRef);

    if (!sessionDoc.exists()) {
      return NextResponse.json(
        { success: false, message: "Session not found" },
        { status: 404 }
      );
    }

    const sessionData = sessionDoc.data();

    // Check if user is either teacher or student
    if (sessionData.teacherId !== userId && sessionData.studentId !== userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized to update this session" },
        { status: 403 }
      );
    }

    const updateData: any = {
      updatedAt: new Date().toISOString(),
    };

    if (status !== undefined) updateData.status = status;
    if (scheduledAt !== undefined) updateData.scheduledAt = scheduledAt;
    if (duration !== undefined) updateData.duration = duration;
    if (message !== undefined) updateData.message = message;
    if (meetingLink !== undefined) updateData.meetingLink = meetingLink;
    if (notes !== undefined) updateData.notes = notes;

    await updateDoc(sessionRef, updateData);

    // Create appropriate notifications based on status change
    if (status) {
      let notificationTitle = "";
      let notificationMessage = "";
      let notificationUserId = "";

      switch (status) {
        case "confirmed":
          notificationTitle = "Session Confirmed";
          notificationMessage = `Your session for ${sessionData.skillTitle} has been confirmed`;
          notificationUserId = sessionData.studentId;
          break;
        case "cancelled":
          notificationTitle = "Session Cancelled";
          notificationMessage = `Your session for ${sessionData.skillTitle} has been cancelled`;
          notificationUserId =
            userId === sessionData.teacherId
              ? sessionData.studentId
              : sessionData.teacherId;
          break;
        case "completed":
          notificationTitle = "Session Completed";
          notificationMessage = `Your session for ${sessionData.skillTitle} has been completed`;
          notificationUserId =
            userId === sessionData.teacherId
              ? sessionData.studentId
              : sessionData.teacherId;
          break;
      }

      if (notificationUserId && notificationTitle) {
        await addDoc(collection(db, "notifications"), {
          userId: notificationUserId,
          type: "session_update",
          title: notificationTitle,
          message: notificationMessage,
          data: {
            sessionId: id,
            status,
          },
          actionUrl: `/sessions/${id}`,
          read: false,
          createdAt: new Date().toISOString(),
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Session updated successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Delete/cancel a session
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
        { success: false, message: "Session ID is required" },
        { status: 400 }
      );
    }

    // Get session document
    const sessionRef = doc(db, "sessions", id);
    const sessionDoc = await getDoc(sessionRef);

    if (!sessionDoc.exists()) {
      return NextResponse.json(
        { success: false, message: "Session not found" },
        { status: 404 }
      );
    }

    const sessionData = sessionDoc.data();

    // Check if user is either teacher or student
    if (sessionData.teacherId !== userId && sessionData.studentId !== userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized to delete this session" },
        { status: 403 }
      );
    }

    // Mark as cancelled instead of deleting
    await updateDoc(sessionRef, {
      status: "cancelled",
      cancelledBy: userId,
      cancelledAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Notify the other party
    const otherUserId =
      userId === sessionData.teacherId
        ? sessionData.studentId
        : sessionData.teacherId;
    await addDoc(collection(db, "notifications"), {
      userId: otherUserId,
      type: "session_cancelled",
      title: "Session Cancelled",
      message: `Your session for ${sessionData.skillTitle} has been cancelled`,
      data: {
        sessionId: id,
        cancelledBy: userId,
      },
      actionUrl: `/sessions/${id}`,
      read: false,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Session cancelled successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
