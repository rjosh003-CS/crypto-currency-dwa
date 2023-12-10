const axios = require('axios');
const {deleteUser, delete_url} = require("./misc/helper_functions");

describe('Mock Tests', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('Mocked test scenario - User delete', async () => {
        jest.mock('axios');
        const mockedData = { success: true, message: "User deleted" };
        axios.post.mockResolvedValue({ data: mockedData });

        const response = await deleteUser('testuser', 'testpassword');

        expect(response).toEqual(mockedData);
    });
});

describe('Actual Network Tests', () => {
    test('Actual network request - User delete', async () => {
        const username = 'testuser';
        const password = 'testpassword';

        const response = await deleteUser(username, password);

        expect(response).toEqual({ success: true, message: "User deleted" });
    });
}
);
