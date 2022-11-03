const bcrypt = require("bcryptjs");
const hashPassword = (password) => bcrypt.hashSync(password, 10);
const compareHash = (hashed, password) => bcrypt.compareSync(hashed, password);

module.exports = { hashPassword, compareHash };
