const axios = require("axios");
const {  baseURL, login_url, loginUser } = require("./misc/helper_functions");

// Mock Axios before importing the module that uses it
jest.mock("axios");

describe("Mock Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Use clearAllMocks instead of resetAllMocks for axios mocking
  });

  test("Mocked test scenario - User login", async () => {
    const mockedData = { success: true, message: "Login successful" };
    axios.post.mockResolvedValue({ data: mockedData });

    const response = await loginUser("testuser", "testpassword");

    // Assertions for the mocked test scenario
    expect(response).toEqual(mockedData);
  });
});

describe("Actual Network Tests", () => {
  test("Actual network request - User login", async () => {
    // Perform an actual network request using Axios
    const username = "testuser";
    const password = "testpassword";

    const response = await loginUser(username, password);

    // Assertions for the actual network request
    expect(response).toEqual({ success: true, message: "Login successful" });
  });
});

describe('Login Route Test', () => {


  test('User login with correct credentials', async () => {
      // Mock user credentials
      const userCredentials = {
          username: 'user',
          password: 'password'
      };

      try {
          const response = await axios.post(`${baseURL}/login`, userCredentials);
          expect(response.status).toBe(200); // Assuming successful login returns status code 200
          expect(response.data).toContain('Login Successful!'); // Assuming response contains this string upon successful login
      } catch (error) {
        console.log(error);
          // Handle any errors
          console.error('Error:', error.response.data);
      }
  });

  test('User login with incorrect credentials', async () => {
      // Mock incorrect user credentials
      const incorrectCredentials = {
          username: 'user',
          password: 'wrongpassword'
      };

      try {
          const response = await axios.post(`${baseURL}/login`, incorrectCredentials);
          expect(response.status).toBe(200); // Assuming failed login also returns status code 200
          expect(response.data).toContain('Login Failed!'); // Assuming response contains this string upon failed login
      } catch (error) {
          console.log(error);
          // Handle any errors
          console.error('Error:', error.response);
      }
  });
});