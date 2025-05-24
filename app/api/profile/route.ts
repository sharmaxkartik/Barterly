import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Get user profile
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
    const userDoc = await getDoc(doc(db, "users", userId));

    if (!userDoc.exists()) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const userData = userDoc.data();

    return NextResponse.json({
      success: true,
      profile: {
        ...userData,
        id: userId,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Update user profile
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
    const updates = await req.json();

    // Remove any sensitive fields that shouldn't be updated this way
    delete updates.email;
    delete updates.hourBalance;
    delete updates.createdAt;

    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
