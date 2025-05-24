#!/usr/bin/env node

/**
 * API Endpoint Testing Script for Barterly Backend
 * This script tests all API endpoints to ensure they're working correctly
 */

const BASE_URL = "http://localhost:3000";

// Test configuration
const testConfig = {
  timeout: 10000, // 10 seconds
  retries: 3,
};

// Test user data
const testUser = {
  email: "test@example.com",
  password: "testpassword123",
  name: "Test User",
  skills: ["Web Development", "Testing"],
};

// Helper function to make HTTP requests
async function makeRequest(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    const data = await response.json();

    return {
      status: response.status,
      statusText: response.statusText,
      data,
      success: response.ok,
    };
  } catch (error) {
    return {
      status: 0,
      statusText: "Network Error",
      data: { error: error.message },
      success: false,
    };
  }
}

// Test results storage
const testResults = {
  passed: 0,
  failed: 0,
  total: 0,
  details: [],
};

// Test runner function
async function runTest(testName, testFunction) {
  testResults.total++;
  console.log(`🧪 Running: ${testName}`);

  try {
    const result = await testFunction();
    if (result.success) {
      testResults.passed++;
      console.log(`✅ PASSED: ${testName}`);
      testResults.details.push({
        name: testName,
        status: "PASSED",
        details: result.message || "OK",
      });
    } else {
      testResults.failed++;
      console.log(
        `❌ FAILED: ${testName} - ${result.message || "Unknown error"}`
      );
      testResults.details.push({
        name: testName,
        status: "FAILED",
        details: result.message || "Unknown error",
      });
    }
  } catch (error) {
    testResults.failed++;
    console.log(`❌ ERROR: ${testName} - ${error.message}`);
    testResults.details.push({
      name: testName,
      status: "ERROR",
      details: error.message,
    });
  }
}

// Individual test functions
async function testHealthCheck() {
  const response = await makeRequest("/api/auth");
  return {
    success: response.status === 405, // Should return method not allowed for GET
    message: `Health check response: ${response.status}`,
  };
}

async function testUsersAPI() {
  // Test GET request (should require authentication)
  const getResponse = await makeRequest("/api/profile");
  return {
    success: getResponse.status === 401 || getResponse.status === 200,
    message: `Profile API responded with status: ${getResponse.status}`,
  };
}

async function testSkillsAPI() {
  // Test GET skills
  const getResponse = await makeRequest("/api/skills");
  return {
    success: getResponse.status === 200 || getResponse.status === 401,
    message: `Skills API responded with status: ${getResponse.status}`,
  };
}

async function testExchangesAPI() {
  const getResponse = await makeRequest("/api/exchanges");
  return {
    success: getResponse.status === 200 || getResponse.status === 401,
    message: `Exchanges API responded with status: ${getResponse.status}`,
  };
}

async function testReviewsAPI() {
  const getResponse = await makeRequest("/api/reviews");
  return {
    success: getResponse.status === 200 || getResponse.status === 401,
    message: `Reviews API responded with status: ${getResponse.status}`,
  };
}

async function testNotificationsAPI() {
  const getResponse = await makeRequest("/api/notifications");
  return {
    success: getResponse.status === 200 || getResponse.status === 401,
    message: `Notifications API responded with status: ${getResponse.status}`,
  };
}

async function testSessionsAPI() {
  const getResponse = await makeRequest("/api/sessions");
  return {
    success: getResponse.status === 200 || getResponse.status === 401,
    message: `Sessions API responded with status: ${getResponse.status}`,
  };
}

async function testWalletAPI() {
  const getResponse = await makeRequest("/api/wallet");
  return {
    success: getResponse.status === 200 || getResponse.status === 401,
    message: `Wallet API responded with status: ${getResponse.status}`,
  };
}

async function testSearchAPI() {
  const getResponse = await makeRequest(
    "/api/search?q=web+development&type=skills"
  );
  return {
    success: getResponse.status === 200 || getResponse.status === 401,
    message: `Search API responded with status: ${getResponse.status}`,
  };
}

async function testAnalyticsAPI() {
  const getResponse = await makeRequest("/api/analytics");
  return {
    success: getResponse.status === 200 || getResponse.status === 401,
    message: `Analytics API responded with status: ${getResponse.status}`,
  };
}

async function testSettingsAPI() {
  const getResponse = await makeRequest("/api/settings");
  return {
    success: getResponse.status === 200 || getResponse.status === 401,
    message: `Settings API responded with status: ${getResponse.status}`,
  };
}

async function testFavoritesAPI() {
  const getResponse = await makeRequest("/api/favorites");
  return {
    success: getResponse.status === 200 || getResponse.status === 401,
    message: `Favorites API responded with status: ${getResponse.status}`,
  };
}

async function testReportsAPI() {
  const getResponse = await makeRequest("/api/reports");
  return {
    success: getResponse.status === 200 || getResponse.status === 401,
    message: `Reports API responded with status: ${getResponse.status}`,
  };
}

async function testMessagesAPI() {
  const getResponse = await makeRequest("/api/messages");
  return {
    success: getResponse.status === 200 || getResponse.status === 401,
    message: `Messages API responded with status: ${getResponse.status}`,
  };
}

async function testUploadAPI() {
  // Test without file upload (should return error)
  const response = await makeRequest("/api/upload", {
    method: "POST",
  });
  return {
    success: response.status === 400 || response.status === 401,
    message: `Upload API responded with status: ${response.status}`,
  };
}

// Main test runner
async function runAllTests() {
  console.log("🚀 Starting Barterly API Endpoint Tests\n");
  console.log(`Base URL: ${BASE_URL}\n`);

  // Run all tests
  await runTest("Health Check", testHealthCheck);
  await runTest("Profile API", testUsersAPI);
  await runTest("Skills API", testSkillsAPI);
  await runTest("Exchanges API", testExchangesAPI);
  await runTest("Reviews API", testReviewsAPI);
  await runTest("Notifications API", testNotificationsAPI);
  await runTest("Sessions API", testSessionsAPI);
  await runTest("Wallet API", testWalletAPI);
  await runTest("Search API", testSearchAPI);
  await runTest("Analytics API", testAnalyticsAPI);
  await runTest("Settings API", testSettingsAPI);
  await runTest("Favorites API", testFavoritesAPI);
  await runTest("Reports API", testReportsAPI);
  await runTest("Messages API", testMessagesAPI);
  await runTest("Upload API", testUploadAPI);

  // Print summary
  console.log("\n" + "=".repeat(50));
  console.log("📊 TEST SUMMARY");
  console.log("=".repeat(50));
  console.log(`Total Tests: ${testResults.total}`);
  console.log(`Passed: ${testResults.passed} ✅`);
  console.log(`Failed: ${testResults.failed} ❌`);
  console.log(
    `Success Rate: ${((testResults.passed / testResults.total) * 100).toFixed(
      1
    )}%`
  );

  if (testResults.failed > 0) {
    console.log("\n📋 Failed Tests:");
    testResults.details
      .filter((test) => test.status !== "PASSED")
      .forEach((test) => {
        console.log(`  • ${test.name}: ${test.details}`);
      });
  }

  console.log("\n🏁 Testing Complete!");

  // Exit with appropriate code
  process.exit(testResults.failed > 0 ? 1 : 0);
}

// Check if this script is run directly
if (require.main === module) {
  runAllTests().catch((error) => {
    console.error("💥 Test runner failed:", error);
    process.exit(1);
  });
}

module.exports = {
  runAllTests,
  makeRequest,
  testConfig,
};
