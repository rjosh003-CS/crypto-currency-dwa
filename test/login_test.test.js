const axios = require("axios");
const { login_url, loginUser } = require("./misc/helper_functions");

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
