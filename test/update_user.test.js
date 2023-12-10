
const axios = require('axios');
const {update_url, updateUser} = require("./misc/helper_functions");

jest.mock("axios");

describe("Mock Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Use clearAllMocks instead of resetAllMocks for axios mocking
    });

// Mock test
describe('Mock Test - Update User Details', () => {
    it('should update user details', async () => {
        // Mock axios request
        jest.mock('axios');
        axios.put.mockResolvedValue({ data: { success: true } });

        // Call the function to update user details
        const response = await updateUser();

        // Assertion
        expect(response.data.success).toBe(true);
    });
});
});


// Network test
describe('Network Test - Update User Details', () => {
    it('should update user details', async () => {
        // Call the function to update user details
        const response = await updateUser();

        // Assertion
        expect(response.data.success).toBe( true);
    });
});


//todo!
/**
 * create test for the api login and register
 * make the api login and register work with OAuth and local Strategy, with the userSchema
 * make the rbac : role based access controll
 * test the role based access controll with test-script
 * access a third party api  - like openAI to work  with the app
 * create the views for the same.
 * 
 * 
 */