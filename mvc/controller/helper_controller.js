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

// export
module.exports = { encrypt, compare };