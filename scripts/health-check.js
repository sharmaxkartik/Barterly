#!/usr/bin/env node

/**
 * Quick API Health Check for Barterly
 * Tests basic connectivity to all API endpoints
 */

const BASE_URL = "http://localhost:3000";

async function testEndpoint(endpoint, expectedStatus = [200, 401, 405]) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    const isExpected = expectedStatus.includes(response.status);

    console.log(
      `${endpoint}: ${response.status} ${response.statusText} ${
        isExpected ? "✅" : "❌"
      }`
    );

    return isExpected;
  } catch (error) {
    console.log(`${endpoint}: ERROR - ${error.message} ❌`);
    return false;
  }
}

async function runHealthCheck() {
  console.log("🏥 Barterly API Health Check");
  console.log(`🌐 Base URL: ${BASE_URL}\n`);
  const endpoints = [
    "/api/auth",
    "/api/profile",
    "/api/skills",
    "/api/exchanges",
    "/api/reviews?skillId=test", // Provide required parameter
    "/api/notifications",
    "/api/sessions",
    "/api/wallet",
    "/api/search?q=test&type=skills", // Provide required parameters
    "/api/analytics",
    "/api/settings",
    "/api/favorites",
    "/api/reports",
    "/api/messages",
    "/api/upload",
  ];

  let passed = 0;
  let total = endpoints.length;

  for (const endpoint of endpoints) {
    const success = await testEndpoint(endpoint);
    if (success) passed++;
  }

  console.log(`\n📊 Results: ${passed}/${total} endpoints healthy`);
  console.log(`✨ Health Score: ${((passed / total) * 100).toFixed(1)}%`);

  if (passed === total) {
    console.log("🎉 All systems operational!");
  } else {
    console.log("⚠️  Some endpoints may need attention");
  }
}

runHealthCheck().catch(console.error);
