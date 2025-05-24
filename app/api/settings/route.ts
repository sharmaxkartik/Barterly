import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Get user settings and preferences
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
    const settingsDoc = await getDoc(doc(db, "userSettings", userId));

    const defaultSettings = {
      notifications: {
        email: {
          sessionReminders: true,
          exchangeUpdates: true,
          newMessages: true,
          reviewReceived: true,
          marketingEmails: false,
        },
        push: {
          sessionReminders: true,
          exchangeUpdates: true,
          newMessages: true,
          reviewReceived: true,
        },
        inApp: {
          sessionReminders: true,
          exchangeUpdates: true,
          newMessages: true,
          reviewReceived: true,
          systemAnnouncements: true,
        },
      },
      privacy: {
        profileVisibility: "public", // "public", "members", "private"
        showEmail: false,
        showLocation: true,
        showOnlineStatus: true,
        allowDirectMessages: true,
      },
      preferences: {
        language: "en",
        timezone: "UTC",
        theme: "system", // "light", "dark", "system"
        currency: "USD",
        timeFormat: "12h", // "12h", "24h"
        dateFormat: "MM/DD/YYYY",
      },
      availability: {
        monday: { available: true, startTime: "09:00", endTime: "17:00" },
        tuesday: { available: true, startTime: "09:00", endTime: "17:00" },
        wednesday: { available: true, startTime: "09:00", endTime: "17:00" },
        thursday: { available: true, startTime: "09:00", endTime: "17:00" },
        friday: { available: true, startTime: "09:00", endTime: "17:00" },
        saturday: { available: false, startTime: "09:00", endTime: "17:00" },
        sunday: { available: false, startTime: "09:00", endTime: "17:00" },
      },
      marketplace: {
        autoAcceptExchanges: false,
        showUnavailableSlots: false,
        requireApprovalForBookings: true,
        defaultSessionDuration: 60, // minutes
        maxAdvanceBooking: 30, // days
        minNoticeRequired: 24, // hours
      },
    };

    const settings = settingsDoc.exists()
      ? { ...defaultSettings, ...settingsDoc.data() }
      : defaultSettings;

    return NextResponse.json({
      success: true,
      settings,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Update user settings
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

    if (!updates || typeof updates !== "object") {
      return NextResponse.json(
        { success: false, message: "Invalid settings data" },
        { status: 400 }
      );
    }

    // Validate settings structure
    const allowedSections = [
      "notifications",
      "privacy",
      "preferences",
      "availability",
      "marketplace",
    ];
    const filteredUpdates: any = {};

    Object.keys(updates).forEach((section) => {
      if (allowedSections.includes(section)) {
        filteredUpdates[section] = updates[section];
      }
    });

    if (Object.keys(filteredUpdates).length === 0) {
      return NextResponse.json(
        { success: false, message: "No valid settings to update" },
        { status: 400 }
      );
    }

    const settingsRef = doc(db, "userSettings", userId);
    const existingDoc = await getDoc(settingsRef);

    if (existingDoc.exists()) {
      // Update existing settings
      await updateDoc(settingsRef, {
        ...filteredUpdates,
        updatedAt: new Date().toISOString(),
      });
    } else {
      // Create new settings document
      await setDoc(settingsRef, {
        userId,
        ...filteredUpdates,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      message: "Settings updated successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Reset settings to defaults
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
    const section = searchParams.get("section");

    const settingsRef = doc(db, "userSettings", userId);
    const settingsDoc = await getDoc(settingsRef);

    if (!settingsDoc.exists()) {
      return NextResponse.json(
        { success: false, message: "Settings not found" },
        { status: 404 }
      );
    }

    if (section) {
      // Reset specific section to defaults
      const defaultSettings = {
        notifications: {
          email: {
            sessionReminders: true,
            exchangeUpdates: true,
            newMessages: true,
            reviewReceived: true,
            marketingEmails: false,
          },
          push: {
            sessionReminders: true,
            exchangeUpdates: true,
            newMessages: true,
            reviewReceived: true,
          },
          inApp: {
            sessionReminders: true,
            exchangeUpdates: true,
            newMessages: true,
            reviewReceived: true,
            systemAnnouncements: true,
          },
        },
        privacy: {
          profileVisibility: "public",
          showEmail: false,
          showLocation: true,
          showOnlineStatus: true,
          allowDirectMessages: true,
        },
        preferences: {
          language: "en",
          timezone: "UTC",
          theme: "system",
          currency: "USD",
          timeFormat: "12h",
          dateFormat: "MM/DD/YYYY",
        },
        availability: {
          monday: { available: true, startTime: "09:00", endTime: "17:00" },
          tuesday: { available: true, startTime: "09:00", endTime: "17:00" },
          wednesday: { available: true, startTime: "09:00", endTime: "17:00" },
          thursday: { available: true, startTime: "09:00", endTime: "17:00" },
          friday: { available: true, startTime: "09:00", endTime: "17:00" },
          saturday: { available: false, startTime: "09:00", endTime: "17:00" },
          sunday: { available: false, startTime: "09:00", endTime: "17:00" },
        },
        marketplace: {
          autoAcceptExchanges: false,
          showUnavailableSlots: false,
          requireApprovalForBookings: true,
          defaultSessionDuration: 60,
          maxAdvanceBooking: 30,
          minNoticeRequired: 24,
        },
      };

      if (defaultSettings[section as keyof typeof defaultSettings]) {
        await updateDoc(settingsRef, {
          [section]: defaultSettings[section as keyof typeof defaultSettings],
          updatedAt: new Date().toISOString(),
        });

        return NextResponse.json({
          success: true,
          message: `${section} settings reset to defaults`,
        });
      } else {
        return NextResponse.json(
          { success: false, message: "Invalid settings section" },
          { status: 400 }
        );
      }
    } else {
      // Reset all settings
      await updateDoc(settingsRef, {
        notifications: {
          email: {
            sessionReminders: true,
            exchangeUpdates: true,
            newMessages: true,
            reviewReceived: true,
            marketingEmails: false,
          },
          push: {
            sessionReminders: true,
            exchangeUpdates: true,
            newMessages: true,
            reviewReceived: true,
          },
          inApp: {
            sessionReminders: true,
            exchangeUpdates: true,
            newMessages: true,
            reviewReceived: true,
            systemAnnouncements: true,
          },
        },
        privacy: {
          profileVisibility: "public",
          showEmail: false,
          showLocation: true,
          showOnlineStatus: true,
          allowDirectMessages: true,
        },
        preferences: {
          language: "en",
          timezone: "UTC",
          theme: "system",
          currency: "USD",
          timeFormat: "12h",
          dateFormat: "MM/DD/YYYY",
        },
        availability: {
          monday: { available: true, startTime: "09:00", endTime: "17:00" },
          tuesday: { available: true, startTime: "09:00", endTime: "17:00" },
          wednesday: { available: true, startTime: "09:00", endTime: "17:00" },
          thursday: { available: true, startTime: "09:00", endTime: "17:00" },
          friday: { available: true, startTime: "09:00", endTime: "17:00" },
          saturday: { available: false, startTime: "09:00", endTime: "17:00" },
          sunday: { available: false, startTime: "09:00", endTime: "17:00" },
        },
        marketplace: {
          autoAcceptExchanges: false,
          showUnavailableSlots: false,
          requireApprovalForBookings: true,
          defaultSessionDuration: 60,
          maxAdvanceBooking: 30,
          minNoticeRequired: 24,
        },
        updatedAt: new Date().toISOString(),
      });

      return NextResponse.json({
        success: true,
        message: "All settings reset to defaults",
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
