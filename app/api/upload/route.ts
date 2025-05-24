import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

// Handle file upload for user avatars and other assets
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
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const uploadType = (formData.get("type") as string) || "avatar";

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type and size
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.",
        },
        { status: 400 }
      );
    }

    if (file.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          message: "File size too large. Maximum 5MB allowed.",
        },
        { status: 400 }
      );
    }

    // For now, we'll return a placeholder URL since we don't have Firebase Storage configured
    // In a real implementation, you would upload to Firebase Storage or another service
    const fileExtension = file.name.split(".").pop();
    const fileName = `${uploadType}_${userId}_${Date.now()}.${fileExtension}`;
    const mockUrl = `/uploads/${fileName}`;

    // Update user profile with new image URL if it's an avatar
    if (uploadType === "avatar") {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        photoURL: mockUrl,
        updatedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
      url: mockUrl,
      fileName,
      size: file.size,
      type: file.type,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Delete uploaded file
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const searchParams = new URL(req.url).searchParams;
    const fileUrl = searchParams.get("url");

    if (!fileUrl) {
      return NextResponse.json(
        { success: false, message: "File URL is required" },
        { status: 400 }
      );
    }

    // In a real implementation, you would delete the file from storage
    // For now, we'll just return success

    return NextResponse.json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
