const bcrypt = require('bcrypt');

const hashPassword =  async (password) => {
    try {
        const salt =  await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        return hashed;
    } catch (error) {
        console.log(error)
    }
}
const comparePassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword)
}

module.exports = { hashPassword, comparePassword }