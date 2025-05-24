import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Get user's favorites
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
    const type = searchParams.get("type") || "all"; // "all", "skills", "users", "exchanges"

    let favoritesQuery;
    if (type === "all") {
      favoritesQuery = query(
        collection(db, "favorites"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
    } else {
      favoritesQuery = query(
        collection(db, "favorites"),
        where("userId", "==", userId),
        where("type", "==", type),
        orderBy("createdAt", "desc")
      );
    }

    const favoritesSnapshot = await getDocs(favoritesQuery);
    const favorites = await Promise.all(
      favoritesSnapshot.docs.map(async (favoriteDoc) => {
        const favoriteData = favoriteDoc.data();

        // Get the actual item data
        let itemData = null;
        try {
          if (favoriteData.type === "skill") {
            const skillDoc = await getDoc(
              doc(db, "skills", favoriteData.itemId)
            );
            if (skillDoc.exists()) {
              itemData = { id: skillDoc.id, ...skillDoc.data() };
            }
          } else if (favoriteData.type === "user") {
            const userDoc = await getDoc(doc(db, "users", favoriteData.itemId));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              itemData = {
                id: userDoc.id,
                displayName: userData.displayName || userData.name,
                bio: userData.bio,
                skills: userData.skills,
                location: userData.location,
                overallRating: userData.overallRating,
                totalReviews: userData.totalReviews,
                photoURL: userData.photoURL,
              };
            }
          } else if (favoriteData.type === "exchange") {
            const exchangeDoc = await getDoc(
              doc(db, "exchanges", favoriteData.itemId)
            );
            if (exchangeDoc.exists()) {
              itemData = { id: exchangeDoc.id, ...exchangeDoc.data() };
            }
          }
        } catch (error) {
          console.error("Error fetching item data:", error);
        }

        return {
          id: favoriteDoc.id,
          type: favoriteData.type,
          itemId: favoriteData.itemId,
          createdAt: favoriteData.createdAt,
          item: itemData,
        };
      })
    );

    // Filter out favorites where the item no longer exists
    const validFavorites = favorites.filter((fav) => fav.item !== null);

    return NextResponse.json({
      success: true,
      favorites: validFavorites,
      total: validFavorites.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Add item to favorites
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
    const { itemId, type } = await req.json();

    if (!itemId || !type) {
      return NextResponse.json(
        { success: false, message: "itemId and type are required" },
        { status: 400 }
      );
    }

    const validTypes = ["skill", "user", "exchange"];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid type. Must be 'skill', 'user', or 'exchange'",
        },
        { status: 400 }
      );
    }

    // Check if the item exists
    let itemExists = false;
    try {
      if (type === "skill") {
        const skillDoc = await getDoc(doc(db, "skills", itemId));
        itemExists = skillDoc.exists();
      } else if (type === "user") {
        const userDoc = await getDoc(doc(db, "users", itemId));
        itemExists = userDoc.exists();
      } else if (type === "exchange") {
        const exchangeDoc = await getDoc(doc(db, "exchanges", itemId));
        itemExists = exchangeDoc.exists();
      }
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Item not found" },
        { status: 404 }
      );
    }

    if (!itemExists) {
      return NextResponse.json(
        { success: false, message: "Item not found" },
        { status: 404 }
      );
    }

    // Check if already favorited
    const existingFavoriteQuery = query(
      collection(db, "favorites"),
      where("userId", "==", userId),
      where("itemId", "==", itemId),
      where("type", "==", type)
    );
    const existingFavorites = await getDocs(existingFavoriteQuery);

    if (!existingFavorites.empty) {
      return NextResponse.json(
        { success: false, message: "Item is already in favorites" },
        { status: 400 }
      );
    }

    // Prevent users from favoriting themselves
    if (type === "user" && itemId === userId) {
      return NextResponse.json(
        { success: false, message: "You cannot favorite yourself" },
        { status: 400 }
      );
    }

    // Add to favorites
    const newFavorite = {
      userId,
      itemId,
      type,
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, "favorites"), newFavorite);

    return NextResponse.json({
      success: true,
      message: "Item added to favorites",
      favoriteId: docRef.id,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Remove item from favorites
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
    const favoriteId = searchParams.get("favoriteId");
    const itemId = searchParams.get("itemId");
    const type = searchParams.get("type");

    if (favoriteId) {
      // Remove by favorite ID
      const favoriteRef = doc(db, "favorites", favoriteId);
      const favoriteDoc = await getDoc(favoriteRef);

      if (!favoriteDoc.exists()) {
        return NextResponse.json(
          { success: false, message: "Favorite not found" },
          { status: 404 }
        );
      }

      const favoriteData = favoriteDoc.data();
      if (favoriteData.userId !== userId) {
        return NextResponse.json(
          { success: false, message: "Unauthorized to remove this favorite" },
          { status: 403 }
        );
      }

      await deleteDoc(favoriteRef);
    } else if (itemId && type) {
      // Remove by item ID and type
      const favoriteQuery = query(
        collection(db, "favorites"),
        where("userId", "==", userId),
        where("itemId", "==", itemId),
        where("type", "==", type)
      );
      const favoriteSnapshot = await getDocs(favoriteQuery);

      if (favoriteSnapshot.empty) {
        return NextResponse.json(
          { success: false, message: "Favorite not found" },
          { status: 404 }
        );
      }

      // Delete all matching favorites (should be only one)
      const deletePromises = favoriteSnapshot.docs.map((doc) =>
        deleteDoc(doc.ref)
      );
      await Promise.all(deletePromises);
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Either favoriteId or both itemId and type are required",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Item removed from favorites",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
