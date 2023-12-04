// Import the necessary modules and functions
const fetch = require("node-fetch");
const env = require("env");

// Set up the variables
const port = env.config();

// login-url
const login_url = `https://localhost:${port}\api\login`;

// Test case for user login
test("User login test", async () => {
  // Mock user credentials
  const username = "testuser";
  const password = "testpassword";

  // Make a POST request to the login endpoint
  const response = await fetch(login_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  // Assert that the response status is 200 (OK)
  expect(response.status).toBe(200);

  // Assert that the response contains the expected data
  const data = await response.json();
  expect(data).toEqual({ success: true, message: "Login successful" });
});
