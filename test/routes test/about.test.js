const axios = require("axios");

const env = require("dotenv");
env.config();

const port = process.env.PORT;
const about_url = `http://localhost:${port}/about`;

let getResponse = null;
let postResponse = null;

beforeAll(async () => {
    [getResponse, postResponse] = await Promise.all([
        axios.get(about_url),
        axios.post(about_url)
    ]);
});

describe('GET /about', () => {
    test('should return 200 status code', () => {
        expect(getResponse.status).toBe(200);
    });
});

describe('GET /about', () => {
    test('should return 200 status code', () => {
        expect(getResponse.data).toBe("about");
    });
});

describe('POST /about', () => {
    test('should return 200 status code', () => {
        expect(postResponse.status).toBe(200);
    });
});

describe('POST /about', () => {
    test('should return 200 status code', () => {
        expect(postResponse.data).toBe("about page");
    });
});