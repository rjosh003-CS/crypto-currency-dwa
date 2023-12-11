const bcrypt = require("bcrypt");

// encrypt function
const encrypt = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

// compare function
const compare = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

/*
// Calling the encrypt function with await
const cryptTest = async (key) => {
    const hashedPassword = await encrypt(key);
    console.log("Hashed Password:", hashedPassword);

    const isMatch = await compare(key, hashedPassword);
    console.log("Password Match:", isMatch);
};

(async () => {
    await cryptTest("hello");
    await cryptTest("password");
})();
*/

// export
module.exports = { encrypt, compare };