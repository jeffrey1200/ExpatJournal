const jwt = require("jsonwebtoken");

function generateToken(user) {
  const payload = {
    user_id: user.id,
    posts: user.posts,
    following: user.following,
    followers: user.followers,
  };
  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = { generateToken };
