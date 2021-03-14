const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
      if (err) return reject(err);
      resolve(hash);
    });
  });
};

const comparePassword = (enteredPassword, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(enteredPassword, hash, (err, same) => {
      if (err) return reject(err);
      resolve(same);
    });
  });
};

module.exports = { hashPassword, comparePassword };
