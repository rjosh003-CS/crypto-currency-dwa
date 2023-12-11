const axios = require("axios");

const env = require("dotenv");
env.config();

const port = process.env.PORT;
const url = `http://localhost:${port}/register  `;

let getResponse = null;
let postResponse = null;

beforeAll(async () => {
    [getResponse, postResponse] = await Promise.all([
        axios.get(url),
        axios.post(url)
    ]);
});

describe('GET /register', () => {
    test('should return 200 status code', () => {
        expect(getResponse.status).toBe(200);
    });
});

describe('GET /register', () => {
    test('should return 200 status code', () => {
        expect(getResponse.data).toBe("register");
    });
});

describe('POST /register', () => {
    test('should return 200 status code', () => {
        expect(postResponse.status).toBe(200);
    });
});

describe('POST /register', () => {
    test('should return 200 status code', () => {
        expect(postResponse.data).toBe("register page");
    });
});