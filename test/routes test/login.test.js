const axios = require("axios");

// const env = require("dotenv");
// env.config();

const port = process.env.PORT;
const url = `http://localhost:${port}/login`;

let getResponse = null;
let postResponse = null;

beforeAll(async () => {
    [getResponse, postResponse] = await Promise.all([
        axios.get(url),
        axios.post(url)
    ]);
});

describe('GET /login', () => {
    test('should return 200 status code', () => {
        expect(getResponse.status).toBe(200);
    });
});

describe('GET /login', () => {
    test('should return 200 status code', () => {
        expect(getResponse.data).toBe("login");
    });
});

describe('POST /login', () => {
    test('should return 200 status code', () => {
        expect(postResponse.status).toBe(200);
    });
});

describe('POST /login', () => {
    test('should return 200 status code', () => {
        expect(postResponse.data).toBe("login page");
    });
});