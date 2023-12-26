const bcrypt = require("bcrypt");

// encrypt function
exports.encrypt = async (password) => {
    const saltRounds = 10;
    console.log(password);
    return await bcrypt.hash(password, saltRounds);
};

// compare function
exports.compare = async (password, hash) => {
    console.log(`password: ${password}`);
    return await bcrypt.compare(password, hash);
};

// Sample code to fetch a random avatar from DiceBear Avatars API
exports.getRandomProfilePic = (initial_first, initial_last) => {
    const randomNumber = Math.floor(Math.random() * 1000); // Generate a random number for variety
    return `https://robohash.org/${initial_first + initial_last}.png`;
};
