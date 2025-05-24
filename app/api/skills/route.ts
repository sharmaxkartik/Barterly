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
  deleteDoc,
} from "firebase/firestore";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Get all skills (public)
export async function GET(req: Request) {
  try {
    const searchParams = new URL(req.url).searchParams;
    const category = searchParams.get("category");

    let skillsQuery = collection(db, "skills");

    if (category && category !== "all") {
      skillsQuery = query(skillsQuery, where("category", "==", category));
    }

    const snapshot = await getDocs(skillsQuery);
    const skills = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json({ skills });
  } catch (error: any) {
    console.error("Skills API Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Create/update a skill (protected)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id, title, description, category, hourlyRate } = await req.json();
    const userId = session.user.id;

    // Create or update the skill
    if (id) {
      // Update existing skill
      const skillRef = doc(db, "skills", id);
      const skillDoc = await getDoc(skillRef);

      if (!skillDoc.exists() || skillDoc.data().userId !== userId) {
        return NextResponse.json(
          { success: false, message: "Unauthorized or skill not found" },
          { status: 403 }
        );
      }

      await updateDoc(skillRef, {
        title,
        description,
        category,
        hourlyRate,
        updatedAt: new Date().toISOString(),
      });

      return NextResponse.json({
        success: true,
        message: "Skill updated successfully",
        id,
      });
    } else {
      // Create new skill
      const skillsCollection = collection(db, "skills");
      const newSkill = {
        userId,
        title,
        description,
        category,
        hourlyRate,
        rating: 0,
        reviews: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const docRef = doc(skillsCollection);
      await setDoc(docRef, newSkill);

      return NextResponse.json({
        success: true,
        message: "Skill created successfully",
        id: docRef.id,
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
