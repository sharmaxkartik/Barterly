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
  limit,
  count,
  getCountFromServer,
} from "firebase/firestore";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Get dashboard analytics for current user
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
    const timeframe = searchParams.get("timeframe") || "30d"; // "7d", "30d", "90d", "1y"

    // Calculate date range
    const now = new Date();
    const daysMap: { [key: string]: number } = {
      "7d": 7,
      "30d": 30,
      "90d": 90,
      "1y": 365,
    };
    const daysBack = daysMap[timeframe] || 30;
    const startDate = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);

    // Initialize analytics object
    const analytics: any = {
      overview: {},
      skills: {},
      exchanges: {},
      sessions: {},
      earnings: {},
      reviews: {},
    };

    // Get user profile data
    const userDoc = await getDoc(doc(db, "users", userId));
    const userData = userDoc.data();

    // Overview stats
    analytics.overview = {
      totalEarnings: userData?.totalEarned || 0,
      currentBalance: userData?.hourBalance || 0,
      totalSessions: 0,
      averageRating: userData?.overallRating || 0,
      totalReviews: userData?.totalReviews || 0,
    };

    // Skills analytics
    const userSkillsQuery = query(
      collection(db, "skills"),
      where("userId", "==", userId)
    );
    const userSkillsSnapshot = await getDocs(userSkillsQuery);
    const userSkills = userSkillsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    analytics.skills = {
      totalSkills: userSkills.length,
      averageRating:
        userSkills.reduce(
          (sum: number, skill: any) => sum + (skill.rating || 0),
          0
        ) / userSkills.length || 0,
      mostPopularSkill:
        userSkills.sort(
          (a: any, b: any) => (b.reviewCount || 0) - (a.reviewCount || 0)
        )[0] || null,
      skillsBreakdown: userSkills.map((skill: any) => ({
        id: skill.id,
        title: skill.title,
        category: skill.category,
        rating: skill.rating || 0,
        reviewCount: skill.reviewCount || 0,
        hourlyRate: skill.hourlyRate || 0,
      })),
    };

    // Sessions analytics (as teacher)
    const teacherSessionsQuery = query(
      collection(db, "sessions"),
      where("teacherId", "==", userId),
      where("createdAt", ">=", startDate.toISOString())
    );
    const teacherSessionsSnapshot = await getDocs(teacherSessionsQuery);
    const teacherSessions = teacherSessionsSnapshot.docs.map((doc) =>
      doc.data()
    );

    // Sessions analytics (as student)
    const studentSessionsQuery = query(
      collection(db, "sessions"),
      where("studentId", "==", userId),
      where("createdAt", ">=", startDate.toISOString())
    );
    const studentSessionsSnapshot = await getDocs(studentSessionsQuery);
    const studentSessions = studentSessionsSnapshot.docs.map((doc) =>
      doc.data()
    );

    const allUserSessions = [...teacherSessions, ...studentSessions];
    analytics.overview.totalSessions = allUserSessions.length;

    analytics.sessions = {
      asTeacher: {
        total: teacherSessions.length,
        completed: teacherSessions.filter((s) => s.status === "completed")
          .length,
        upcoming: teacherSessions.filter(
          (s) => s.status === "confirmed" && new Date(s.scheduledAt) > now
        ).length,
        pending: teacherSessions.filter((s) => s.status === "requested").length,
        totalHoursTaught:
          teacherSessions
            .filter((s) => s.status === "completed")
            .reduce((sum, s) => sum + (s.duration || 0), 0) / 60,
      },
      asStudent: {
        total: studentSessions.length,
        completed: studentSessions.filter((s) => s.status === "completed")
          .length,
        upcoming: studentSessions.filter(
          (s) => s.status === "confirmed" && new Date(s.scheduledAt) > now
        ).length,
        pending: studentSessions.filter((s) => s.status === "requested").length,
        totalHoursLearned:
          studentSessions
            .filter((s) => s.status === "completed")
            .reduce((sum, s) => sum + (s.duration || 0), 0) / 60,
      },
    };

    // Exchanges analytics
    const userExchangesQuery = query(
      collection(db, "exchanges"),
      where("creatorId", "==", userId),
      where("createdAt", ">=", startDate.toISOString())
    );
    const userExchangesSnapshot = await getDocs(userExchangesQuery);
    const userExchanges = userExchangesSnapshot.docs.map((doc) => doc.data());

    analytics.exchanges = {
      total: userExchanges.length,
      open: userExchanges.filter((e) => e.status === "open").length,
      completed: userExchanges.filter((e) => e.status === "completed").length,
      cancelled: userExchanges.filter((e) => e.status === "cancelled").length,
    };

    // Earnings analytics
    const earningsQuery = query(
      collection(db, "transactions"),
      where("userId", "==", userId),
      where("type", "in", ["session_earning", "exchange_completion", "bonus"]),
      where("createdAt", ">=", startDate.toISOString()),
      orderBy("createdAt", "desc")
    );
    const earningsSnapshot = await getDocs(earningsQuery);
    const earnings = earningsSnapshot.docs.map((doc) => doc.data());

    // Group earnings by date for chart data
    const earningsByDate: { [key: string]: number } = {};
    earnings.forEach((transaction) => {
      const date = new Date(transaction.createdAt).toISOString().split("T")[0];
      earningsByDate[date] =
        (earningsByDate[date] || 0) + (transaction.amount || 0);
    });

    analytics.earnings = {
      totalInPeriod: earnings.reduce((sum, t) => sum + (t.amount || 0), 0),
      averagePerSession:
        earnings.length > 0
          ? earnings.reduce((sum, t) => sum + (t.amount || 0), 0) /
            earnings.length
          : 0,
      chartData: Object.entries(earningsByDate)
        .map(([date, amount]) => ({
          date,
          amount,
        }))
        .sort((a, b) => a.date.localeCompare(b.date)),
      recentTransactions: earnings.slice(0, 10),
    };

    // Reviews analytics
    const reviewsReceivedQuery = query(
      collection(db, "reviews"),
      where("revieweeId", "==", userId),
      where("createdAt", ">=", startDate.toISOString()),
      orderBy("createdAt", "desc")
    );
    const reviewsReceivedSnapshot = await getDocs(reviewsReceivedQuery);
    const reviewsReceived = reviewsReceivedSnapshot.docs.map((doc) =>
      doc.data()
    );

    const reviewsGivenQuery = query(
      collection(db, "reviews"),
      where("reviewerId", "==", userId),
      where("createdAt", ">=", startDate.toISOString())
    );
    const reviewsGivenSnapshot = await getDocs(reviewsGivenQuery);
    const reviewsGiven = reviewsGivenSnapshot.docs.map((doc) => doc.data());

    analytics.reviews = {
      received: {
        total: reviewsReceived.length,
        averageRating:
          reviewsReceived.reduce((sum, r) => sum + (r.rating || 0), 0) /
            reviewsReceived.length || 0,
        averageSessionQuality:
          reviewsReceived.reduce((sum, r) => sum + (r.sessionQuality || 0), 0) /
            reviewsReceived.length || 0,
        averagePunctuality:
          reviewsReceived.reduce((sum, r) => sum + (r.punctuality || 0), 0) /
            reviewsReceived.length || 0,
        averageCommunication:
          reviewsReceived.reduce((sum, r) => sum + (r.communication || 0), 0) /
            reviewsReceived.length || 0,
        recent: reviewsReceived.slice(0, 5),
      },
      given: {
        total: reviewsGiven.length,
        averageRating:
          reviewsGiven.reduce((sum, r) => sum + (r.rating || 0), 0) /
            reviewsGiven.length || 0,
      },
    };

    // Activity timeline (recent activities)
    const recentActivities = [
      ...teacherSessions.slice(0, 5).map((s) => ({
        type: "session_taught",
        date: s.createdAt,
        description: `Taught ${s.skillTitle}`,
        data: s,
      })),
      ...studentSessions.slice(0, 5).map((s) => ({
        type: "session_learned",
        date: s.createdAt,
        description: `Learned ${s.skillTitle}`,
        data: s,
      })),
      ...userExchanges.slice(0, 5).map((e) => ({
        type: "exchange_created",
        date: e.createdAt,
        description: `Created exchange: ${e.title}`,
        data: e,
      })),
      ...reviewsReceived.slice(0, 5).map((r) => ({
        type: "review_received",
        date: r.createdAt,
        description: `Received ${r.rating}-star review`,
        data: r,
      })),
    ]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);

    analytics.recentActivity = recentActivities;

    return NextResponse.json({
      success: true,
      analytics,
      timeframe,
      generatedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Get platform-wide statistics (admin only)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check if user is admin (you can implement your own admin check logic)
    const userDoc = await getDoc(doc(db, "users", session.user.id));
    const userData = userDoc.data();

    if (!userData?.isAdmin) {
      return NextResponse.json(
        { success: false, message: "Admin access required" },
        { status: 403 }
      );
    }

    const { timeframe = "30d" } = await req.json();

    // Calculate date range
    const now = new Date();
    const daysMap: { [key: string]: number } = {
      "7d": 7,
      "30d": 30,
      "90d": 90,
      "1y": 365,
    };
    const daysBack = daysMap[timeframe] || 30;
    const startDate = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);

    // Get platform statistics
    const platformStats: any = {};

    // Users
    const usersSnapshot = await getCountFromServer(collection(db, "users"));
    platformStats.totalUsers = usersSnapshot.data().count;

    // Skills
    const skillsSnapshot = await getCountFromServer(collection(db, "skills"));
    platformStats.totalSkills = skillsSnapshot.data().count;

    // Exchanges
    const exchangesSnapshot = await getCountFromServer(
      collection(db, "exchanges")
    );
    platformStats.totalExchanges = exchangesSnapshot.data().count;

    // Sessions
    const sessionsSnapshot = await getCountFromServer(
      collection(db, "sessions")
    );
    platformStats.totalSessions = sessionsSnapshot.data().count;

    // Recent registrations
    const recentUsersQuery = query(
      collection(db, "users"),
      where("createdAt", ">=", startDate.toISOString()),
      orderBy("createdAt", "desc"),
      limit(10)
    );
    const recentUsersSnapshot = await getDocs(recentUsersQuery);
    platformStats.newUsersInPeriod = recentUsersSnapshot.docs.length;

    // Active users (users who have had activity in the period)
    const recentSessionsQuery = query(
      collection(db, "sessions"),
      where("createdAt", ">=", startDate.toISOString())
    );
    const recentSessionsSnapshot = await getDocs(recentSessionsQuery);
    const activeUserIds = new Set();
    recentSessionsSnapshot.docs.forEach((doc) => {
      const data = doc.data();
      activeUserIds.add(data.teacherId);
      activeUserIds.add(data.studentId);
    });
    platformStats.activeUsersInPeriod = activeUserIds.size;

    return NextResponse.json({
      success: true,
      platformStats,
      timeframe,
      generatedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
