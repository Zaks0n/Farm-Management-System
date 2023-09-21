const bcrypt = require('bcrypt');

// const salt = 10;
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

const comparePassword = async (password, hash) => {
    const match = await bcrypt.compare(password, hash);
    return match;
}


module.exports = {
    hashPassword,
    comparePassword,
}
