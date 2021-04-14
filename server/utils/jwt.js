const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const sign = (user) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        id: user.id,
      },
      JWT_SECRET_KEY,
      (err, token) => {
        if (err) return reject(err);
        resolve(token);
      }
    );
  });
};

const verify = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
};

module.exports = { sign, verify };
