var jwt = require("jsonwebtoken");
const authMiddleware = (user) => {
  const token = jwt.sign(
    { user_id: user.user_id, email: user.email },
    "HJSDHDSLDLSDJSL",
    { expiresIn: "1h" }
  );

  return token;
};

module.exports = authMiddleware;
