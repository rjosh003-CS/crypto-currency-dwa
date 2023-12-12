const axios = require("axios");

const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT;
const url = `http://localhost:${port}/`;

let getResponse = null;
let postResponse = null;

beforeAll(async () => {
    [getResponse, postResponse] = await Promise.all([
        axios.get(url),
        axios.post(url)
    ]);
});

describe('GET /about', () => {
    test('should return 200 status code', () => {
        expect(getResponse.status).toBe(200);
    });
});

describe('GET /about', () => {
    test('should return 200 status code', () => {
        expect(getResponse.data).toBe("home");
    });
});

describe('POST /about', () => {
    test('should return 200 status code', () => {
        expect(postResponse.status).toBe(200);
    });
});

describe('POST /about', () => {
    test('should return 200 status code', () => {
        expect(postResponse.data).toBe("home page");
    });
});