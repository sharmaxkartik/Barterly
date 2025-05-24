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

// Get reviews for a skill or user
export async function GET(req: Request) {
  try {
    const searchParams = new URL(req.url).searchParams;
    const skillId = searchParams.get("skillId");
    const userId = searchParams.get("userId");

    if (!skillId && !userId) {
      return NextResponse.json(
        { success: false, message: "skillId or userId is required" },
        { status: 400 }
      );
    }
    let reviewsQuery;
    if (skillId) {
      reviewsQuery = query(
        collection(db, "reviews"),
        where("skillId", "==", skillId)
      );
    } else {
      reviewsQuery = query(
        collection(db, "reviews"),
        where("revieweeId", "==", userId)
      );
    }

    const snapshot = await getDocs(reviewsQuery);
    const reviews = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json({ reviews });
  } catch (error: any) {
    console.error("Reviews API Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Create a new review
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
      skillId,
      revieweeId,
      exchangeId,
      rating,
      comment,
      sessionQuality,
      punctuality,
      communication,
    } = await req.json();

    if (!skillId || !revieweeId || !rating) {
      return NextResponse.json(
        {
          success: false,
          message: "skillId, revieweeId, and rating are required",
        },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, message: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Check if user already reviewed this skill/exchange
    if (exchangeId) {
      const existingReviewQuery = query(
        collection(db, "reviews"),
        where("reviewerId", "==", userId),
        where("exchangeId", "==", exchangeId)
      );
      const existingReviews = await getDocs(existingReviewQuery);

      if (!existingReviews.empty) {
        return NextResponse.json(
          {
            success: false,
            message: "You have already reviewed this exchange",
          },
          { status: 400 }
        );
      }
    }

    const newReview = {
      reviewerId: userId,
      reviewerName: session.user.name || "Anonymous",
      skillId,
      revieweeId,
      exchangeId: exchangeId || null,
      rating,
      comment: comment || "",
      sessionQuality: sessionQuality || rating,
      punctuality: punctuality || rating,
      communication: communication || rating,
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, "reviews"), newReview);

    // Update skill average rating
    const skillRef = doc(db, "skills", skillId);
    const skillDoc = await getDoc(skillRef);

    if (skillDoc.exists()) {
      const skillData = skillDoc.data();
      const currentRating = skillData.rating || 0;
      const currentReviews = skillData.reviewCount || 0;
      const newRating =
        (currentRating * currentReviews + rating) / (currentReviews + 1);

      await updateDoc(skillRef, {
        rating: newRating,
        reviewCount: currentReviews + 1,
        updatedAt: new Date().toISOString(),
      });
    }

    // Update user overall rating
    const userRef = doc(db, "users", revieweeId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const currentRating = userData.overallRating || 0;
      const currentReviews = userData.totalReviews || 0;
      const newRating =
        (currentRating * currentReviews + rating) / (currentReviews + 1);

      await updateDoc(userRef, {
        overallRating: newRating,
        totalReviews: currentReviews + 1,
        updatedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      message: "Review created successfully",
      id: docRef.id,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Update a review
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
    const { id, rating, comment, sessionQuality, punctuality, communication } =
      await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Review ID is required" },
        { status: 400 }
      );
    }

    // Check if user owns this review
    const reviewRef = doc(db, "reviews", id);
    const reviewDoc = await getDoc(reviewRef);

    if (!reviewDoc.exists()) {
      return NextResponse.json(
        { success: false, message: "Review not found" },
        { status: 404 }
      );
    }

    const reviewData = reviewDoc.data();
    if (reviewData.reviewerId !== userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized to update this review" },
        { status: 403 }
      );
    }

    const updateData: any = {
      updatedAt: new Date().toISOString(),
    };

    if (rating !== undefined) updateData.rating = rating;
    if (comment !== undefined) updateData.comment = comment;
    if (sessionQuality !== undefined)
      updateData.sessionQuality = sessionQuality;
    if (punctuality !== undefined) updateData.punctuality = punctuality;
    if (communication !== undefined) updateData.communication = communication;

    await updateDoc(reviewRef, updateData);

    return NextResponse.json({
      success: true,
      message: "Review updated successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
