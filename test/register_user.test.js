const axios = require("axios");
const { register_url, registerUser } = require("./misc/helper_functions");

// Mock Axios before importing the module that uses it
jest.mock("axios");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Mock Test - POST /register", () => {
  it("should register a user and return a success message", async () => {
    const userData = {
      username: "testuser",
      password: "testpassword",
      email: "test@example.com"
    };

    // Mocking the axios post method
    axios.post = jest
      .fn()
      .mockResolvedValueOnce({
        data: { message: "User registered successfully" },
      });

    const response = await registerUser(userData);

    expect(response).toHaveProperty("message", "User registered successfully");
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(register_url, userData);
  });

  it("should return an error if required fields are missing", async () => {
    const userData = {
      username: "testuser",
      password: "testpassword",
    };

    // Mocking the axios post method
    axios.post = jest
      .fn()
      .mockRejectedValueOnce({
        response: { data: { error: "Missing required fields" } },
      });

    try {
      await registerUser(userData);
    } catch (error) {
      expect(error.message).toBe("Missing required fields");
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(register_url, userData);
    }
  });
});

describe("Network Test - POST /register", () => {
  it("should register a user and return a success message", async () => {
    const userData = {
      username: "testuser",
      password: "testpassword",
      email: "test@example.com",
    };

    const response = await registerUser(userData);
    console.log("1:", response);
    expect(response).toHaveProperty("message", "User registered successfully");

    // reset the axios mock after each test
    axios.get.mockReset();
  });

  it("should return an error if required fields are missing", async () => {
    const userData = {
      username: "testuser",
      password: "testpassword",
    };

    try {
      await registerUser(userData);
    } catch (error) {
        console.log("2:",error);
      expect(error.message).toBe("Missing required fields");
    }
  });
});
