import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function testFirebaseConnection() {
  try {
    // Try to read from a collection to test the connection
    const testCollection = collection(db, "test");
    const snapshot = await getDocs(testCollection);

    console.log("✅ Firebase connection successful");
    console.log(`📊 Test collection has ${snapshot.size} documents`);

    return true;
  } catch (error) {
    console.error("❌ Firebase connection failed:", error);
    return false;
  }
}

// Test the connection when this module is imported
if (typeof window === "undefined") {
  // Only run on server side
  testFirebaseConnection();
}
