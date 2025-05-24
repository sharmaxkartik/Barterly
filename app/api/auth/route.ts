import { NextResponse } from "next/server";
import { auth, db } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const { email, password, action, displayName } = await req.json();

    let result: UserCredential;

    if (action === "register") {
      result = await createUserWithEmailAndPassword(auth, email, password);

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
    } else if (action === "login") {
      result = await signInWithEmailAndPassword(auth, email, password);
      return NextResponse.json({
        success: true,
        message: "User logged in successfully",
        uid: result.user.uid,
      });
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid action" },
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
