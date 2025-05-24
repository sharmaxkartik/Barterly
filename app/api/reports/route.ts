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
  limit,
} from "firebase/firestore";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Get reports (admin only) or user's own reports
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
    const isAdmin = searchParams.get("admin") === "true";
    const status = searchParams.get("status") || "all"; // "all", "pending", "reviewing", "resolved", "dismissed"
    const type = searchParams.get("type") || "all"; // "all", "user", "skill", "exchange", "session", "review"

    // Check if user is admin (implement your own admin check logic)
    const userDoc = await getDoc(doc(db, "users", userId));
    const userData = userDoc.data();
    const userIsAdmin = userData?.isAdmin || false;

    let reportsQuery;

    if (isAdmin && userIsAdmin) {
      // Admin can see all reports
      const queryConstraints: any[] = [
        orderBy("createdAt", "desc"),
        limit(100),
      ];

      if (status !== "all") {
        queryConstraints.unshift(where("status", "==", status));
      }

      if (type !== "all") {
        queryConstraints.unshift(where("reportType", "==", type));
      }

      reportsQuery = query(collection(db, "reports"), ...queryConstraints);
    } else {
      // Regular users can only see their own reports
      const queryConstraints: any[] = [
        where("reporterId", "==", userId),
        orderBy("createdAt", "desc"),
        limit(50),
      ];

      if (status !== "all") {
        queryConstraints.splice(1, 0, where("status", "==", status));
      }

      reportsQuery = query(collection(db, "reports"), ...queryConstraints);
    }

    const reportsSnapshot = await getDocs(reportsQuery);
    const reports = reportsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({
      success: true,
      reports,
      isAdmin: userIsAdmin,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Submit a new report
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
      reportType, // "user", "skill", "exchange", "session", "review"
      reportedItemId,
      reportedUserId,
      reason, // "spam", "inappropriate", "harassment", "fraud", "copyright", "other"
      description,
      evidence, // URLs, screenshots, etc.
    } = await req.json();

    if (!reportType || !reportedItemId || !reason) {
      return NextResponse.json(
        {
          success: false,
          message: "reportType, reportedItemId, and reason are required",
        },
        { status: 400 }
      );
    }

    const validTypes = ["user", "skill", "exchange", "session", "review"];
    const validReasons = [
      "spam",
      "inappropriate",
      "harassment",
      "fraud",
      "copyright",
      "fake_profile",
      "scam",
      "other",
    ];

    if (!validTypes.includes(reportType)) {
      return NextResponse.json(
        { success: false, message: "Invalid report type" },
        { status: 400 }
      );
    }

    if (!validReasons.includes(reason)) {
      return NextResponse.json(
        { success: false, message: "Invalid reason" },
        { status: 400 }
      );
    }

    // Verify the reported item exists
    let itemExists = false;
    let reportedItemData = null;

    try {
      if (reportType === "user") {
        const userDoc = await getDoc(doc(db, "users", reportedItemId));
        itemExists = userDoc.exists();
        if (itemExists) {
          const data = userDoc.data();
          reportedItemData = {
            displayName: data?.displayName || data?.name,
            email: data?.email,
          };
        }
      } else if (reportType === "skill") {
        const skillDoc = await getDoc(doc(db, "skills", reportedItemId));
        itemExists = skillDoc.exists();
        if (itemExists) {
          const data = skillDoc.data();
          reportedItemData = {
            title: data?.title,
            userId: data?.userId,
          };
        }
      } else if (reportType === "exchange") {
        const exchangeDoc = await getDoc(doc(db, "exchanges", reportedItemId));
        itemExists = exchangeDoc.exists();
        if (itemExists) {
          const data = exchangeDoc.data();
          reportedItemData = {
            title: data?.title,
            creatorId: data?.creatorId,
          };
        }
      } else if (reportType === "session") {
        const sessionDoc = await getDoc(doc(db, "sessions", reportedItemId));
        itemExists = sessionDoc.exists();
        if (itemExists) {
          const data = sessionDoc.data();
          reportedItemData = {
            skillTitle: data?.skillTitle,
            teacherId: data?.teacherId,
            studentId: data?.studentId,
          };
        }
      } else if (reportType === "review") {
        const reviewDoc = await getDoc(doc(db, "reviews", reportedItemId));
        itemExists = reviewDoc.exists();
        if (itemExists) {
          const data = reviewDoc.data();
          reportedItemData = {
            reviewerId: data?.reviewerId,
            revieweeId: data?.revieweeId,
            rating: data?.rating,
          };
        }
      }
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Reported item not found" },
        { status: 404 }
      );
    }

    if (!itemExists) {
      return NextResponse.json(
        { success: false, message: "Reported item not found" },
        { status: 404 }
      );
    }

    // Check if user has already reported this item
    const existingReportQuery = query(
      collection(db, "reports"),
      where("reporterId", "==", userId),
      where("reportedItemId", "==", reportedItemId),
      where("reportType", "==", reportType)
    );
    const existingReports = await getDocs(existingReportQuery);

    if (!existingReports.empty) {
      return NextResponse.json(
        { success: false, message: "You have already reported this item" },
        { status: 400 }
      );
    }

    // Create the report
    const newReport = {
      reporterId: userId,
      reporterName: session.user.name || "Anonymous",
      reportType,
      reportedItemId,
      reportedUserId:
        reportedUserId ||
        reportedItemData?.userId ||
        reportedItemData?.creatorId ||
        null,
      reason,
      description: description || "",
      evidence: evidence || [],
      status: "pending", // "pending", "reviewing", "resolved", "dismissed"
      reportedItemData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, "reports"), newReport);

    // Create notification for admins (you can implement admin notification logic)
    // For now, we'll skip this part

    return NextResponse.json({
      success: true,
      message: "Report submitted successfully",
      reportId: docRef.id,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Update report status (admin only)
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

    // Check if user is admin
    const userDoc = await getDoc(doc(db, "users", userId));
    const userData = userDoc.data();

    if (!userData?.isAdmin) {
      return NextResponse.json(
        { success: false, message: "Admin access required" },
        { status: 403 }
      );
    }

    const {
      reportId,
      status,
      adminNotes,
      action, // "none", "warning", "suspend", "ban", "remove_content"
    } = await req.json();

    if (!reportId || !status) {
      return NextResponse.json(
        { success: false, message: "reportId and status are required" },
        { status: 400 }
      );
    }

    const validStatuses = ["pending", "reviewing", "resolved", "dismissed"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid status" },
        { status: 400 }
      );
    }

    const reportRef = doc(db, "reports", reportId);
    const reportDoc = await getDoc(reportRef);

    if (!reportDoc.exists()) {
      return NextResponse.json(
        { success: false, message: "Report not found" },
        { status: 404 }
      );
    }

    const updateData: any = {
      status,
      reviewedBy: userId,
      reviewedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (adminNotes) updateData.adminNotes = adminNotes;
    if (action) updateData.action = action;

    await updateDoc(reportRef, updateData);

    // If action is taken, implement the corresponding logic
    // For example, if action is "suspend", update the user's account status
    // This would require additional implementation based on your user management system

    return NextResponse.json({
      success: true,
      message: "Report updated successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
