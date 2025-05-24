import { NextResponse } from "next/server";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const { email, password, displayName } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    // Register user with Firebase Auth
    const result = await createUserWithEmailAndPassword(auth, email, password);

    // Store user profile in Firestore
    await setDoc(doc(db, "users", result.user.uid), {
      displayName: displayName || email.split("@")[0],
      email,
      createdAt: new Date().toISOString(),
      skills: [],
      interests: [],
      hourBalance: 0,
    });

    return NextResponse.json({
      success: true,
      message: "User registered successfully",
      uid: result.user.uid,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
