import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  doc,
  getDoc,
} from "firebase/firestore";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Global search endpoint
export async function GET(req: Request) {
  try {
    const searchParams = new URL(req.url).searchParams;
    const searchQuery = searchParams.get("q");
    const type = searchParams.get("type") || "all"; // "all", "skills", "users", "exchanges"
    const category = searchParams.get("category");
    const locationFilter = searchParams.get("location");
    const ratingMin = parseFloat(searchParams.get("ratingMin") || "0");
    const sortBy = searchParams.get("sortBy") || "relevance"; // "relevance", "rating", "recent", "price"
    const page = parseInt(searchParams.get("page") || "1");
    const limitCount = parseInt(searchParams.get("limit") || "20");

    if (!searchQuery && type === "all") {
      return NextResponse.json(
        { success: false, message: "Search query is required" },
        { status: 400 }
      );
    }

    const results: any = {
      skills: [],
      users: [],
      exchanges: [],
      totalResults: 0,
    }; // Search skills
    if (type === "all" || type === "skills") {
      const skillsCollection = collection(db, "skills");
      let skillsQuery;

      // Apply filters
      const skillFilters: any[] = [];

      if (category && category !== "all") {
        skillFilters.push(where("category", "==", category));
      }

      if (ratingMin > 0) {
        skillFilters.push(where("rating", ">=", ratingMin));
      }

      if (skillFilters.length > 0) {
        skillsQuery = query(skillsCollection, ...skillFilters);
      } else {
        skillsQuery = skillsCollection;
      }

      const skillsSnapshot = await getDocs(skillsQuery);
      let skills = skillsSnapshot.docs.map((doc) => ({
        id: doc.id,
        type: "skill",
        ...doc.data(),
      }));

      // Filter by search query (client-side filtering for text search)
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        skills = skills.filter(
          (skill: any) =>
            skill.title?.toLowerCase().includes(searchLower) ||
            skill.description?.toLowerCase().includes(searchLower) ||
            skill.category?.toLowerCase().includes(searchLower)
        );
      }

      // Apply sorting
      if (sortBy === "rating") {
        skills.sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0));
      } else if (sortBy === "recent") {
        skills.sort(
          (a: any, b: any) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
        );
      } else if (sortBy === "price") {
        skills.sort(
          (a: any, b: any) => (a.hourlyRate || 0) - (b.hourlyRate || 0)
        );
      }

      results.skills = skills.slice(0, limitCount);
    }

    // Search users
    if (type === "all" || type === "users") {
      const usersSnapshot = await getDocs(collection(db, "users"));
      let users = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        type: "user",
        ...doc.data(),
      }));

      // Filter by search query
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        users = users.filter(
          (user: any) =>
            user.displayName?.toLowerCase().includes(searchLower) ||
            user.name?.toLowerCase().includes(searchLower) ||
            user.bio?.toLowerCase().includes(searchLower) ||
            user.skills?.some((skill: string) =>
              skill.toLowerCase().includes(searchLower)
            )
        );
      }

      // Filter by location
      if (locationFilter) {
        users = users.filter((user: any) =>
          user.location?.toLowerCase().includes(locationFilter.toLowerCase())
        );
      }

      // Filter by rating
      if (ratingMin > 0) {
        users = users.filter(
          (user: any) => (user.overallRating || 0) >= ratingMin
        );
      }

      // Apply sorting
      if (sortBy === "rating") {
        users.sort(
          (a: any, b: any) => (b.overallRating || 0) - (a.overallRating || 0)
        );
      } else if (sortBy === "recent") {
        users.sort(
          (a: any, b: any) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
        );
      }

      // Remove sensitive information
      users = users.map((user: any) => ({
        id: user.id,
        type: "user",
        displayName: user.displayName || user.name,
        bio: user.bio,
        skills: user.skills,
        location: user.location,
        overallRating: user.overallRating,
        totalReviews: user.totalReviews,
        photoURL: user.photoURL,
      }));

      results.users = users.slice(0, limitCount);
    }

    // Search exchanges
    if (type === "all" || type === "exchanges") {
      let exchangesQuery = query(
        collection(db, "exchanges"),
        where("status", "==", "open")
      );

      const exchangesSnapshot = await getDocs(exchangesQuery);
      let exchanges = exchangesSnapshot.docs.map((doc) => ({
        id: doc.id,
        type: "exchange",
        ...doc.data(),
      }));

      // Filter by search query
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        exchanges = exchanges.filter(
          (exchange: any) =>
            exchange.title?.toLowerCase().includes(searchLower) ||
            exchange.description?.toLowerCase().includes(searchLower) ||
            exchange.lookingFor?.toLowerCase().includes(searchLower) ||
            exchange.offering?.toLowerCase().includes(searchLower)
        );
      }

      // Apply sorting
      if (sortBy === "recent") {
        exchanges.sort(
          (a: any, b: any) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
        );
      }

      results.exchanges = exchanges.slice(0, limitCount);
    }

    results.totalResults =
      results.skills.length + results.users.length + results.exchanges.length;

    return NextResponse.json({
      success: true,
      results,
      query: searchQuery,
      filters: {
        type,
        category,
        location: locationFilter,
        ratingMin,
        sortBy,
      },
      pagination: {
        page,
        limit: limitCount,
        hasMore: results.totalResults === limitCount, // Simplified check
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Get search suggestions/autocomplete
export async function POST(req: Request) {
  try {
    const { query: searchQuery, type = "all" } = await req.json();

    if (!searchQuery || searchQuery.length < 2) {
      return NextResponse.json({
        suggestions: [],
      });
    }

    const suggestions: string[] = [];
    const searchLower = searchQuery.toLowerCase();

    // Get skill titles and categories
    if (type === "all" || type === "skills") {
      const skillsSnapshot = await getDocs(collection(db, "skills"));

      skillsSnapshot.docs.forEach((doc) => {
        const data = doc.data();
        const title = data.title?.toLowerCase();
        const category = data.category?.toLowerCase();

        if (title?.includes(searchLower) && !suggestions.includes(data.title)) {
          suggestions.push(data.title);
        }

        if (
          category?.includes(searchLower) &&
          !suggestions.includes(data.category)
        ) {
          suggestions.push(data.category);
        }
      });
    }

    // Get user names and skills
    if (type === "all" || type === "users") {
      const usersSnapshot = await getDocs(collection(db, "users"));

      usersSnapshot.docs.forEach((doc) => {
        const data = doc.data();
        const name = (data.displayName || data.name)?.toLowerCase();

        if (
          name?.includes(searchLower) &&
          !suggestions.includes(data.displayName || data.name)
        ) {
          suggestions.push(data.displayName || data.name);
        }

        // Add user skills to suggestions
        if (data.skills && Array.isArray(data.skills)) {
          data.skills.forEach((skill: string) => {
            if (
              skill.toLowerCase().includes(searchLower) &&
              !suggestions.includes(skill)
            ) {
              suggestions.push(skill);
            }
          });
        }
      });
    }

    // Get exchange keywords
    if (type === "all" || type === "exchanges") {
      const exchangesSnapshot = await getDocs(
        query(collection(db, "exchanges"), where("status", "==", "open"))
      );

      exchangesSnapshot.docs.forEach((doc) => {
        const data = doc.data();
        const title = data.title?.toLowerCase();
        const offering = data.offering?.toLowerCase();
        const lookingFor = data.lookingFor?.toLowerCase();

        if (title?.includes(searchLower) && !suggestions.includes(data.title)) {
          suggestions.push(data.title);
        }

        if (
          offering?.includes(searchLower) &&
          !suggestions.includes(data.offering)
        ) {
          suggestions.push(data.offering);
        }

        if (
          lookingFor?.includes(searchLower) &&
          !suggestions.includes(data.lookingFor)
        ) {
          suggestions.push(data.lookingFor);
        }
      });
    }

    // Sort by relevance (exact matches first, then partial matches)
    suggestions.sort((a, b) => {
      const aExact = a.toLowerCase() === searchLower;
      const bExact = b.toLowerCase() === searchLower;

      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;

      const aStarts = a.toLowerCase().startsWith(searchLower);
      const bStarts = b.toLowerCase().startsWith(searchLower);

      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;

      return a.length - b.length;
    });

    return NextResponse.json({
      suggestions: suggestions.slice(0, 10), // Limit to 10 suggestions
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
