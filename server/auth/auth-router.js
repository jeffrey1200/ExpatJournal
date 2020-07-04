const authRouter = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("./auth-model");
const { generateToken } = require("../middleware/globalMiddleware");

authRouter.get("/", (req, res) => {
  Users.getAll()
    .then((allUsers) => {
      res.status(200).json(allUsers);
    })
    .catch((err) => {
      res.status(500).json({ message: "Weyyyy fallo la vaina" });
    });
});

authRouter.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  return Users.addUser(user)
    .then((newUser) => {
      delete newUser.password;
      const token = generateToken(newUser);
      res.status(201).json({
        message: "El usuario ha sido creado exitosamente",
        token,
        user: newUser,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

authRouter.post("/login", (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    res.status(403).json({
      message: "username, email, and password fields cannot be blank",
    });
  } else {
    Users.findUserByUsername(username)
      .then((user) => {
        if (user && bcrypt.compareSync(password, user.password)) {
          delete user.password;
          const token = generateToken(user);
          res.status(200).json({
            message: `Welcome back ${user.firstName}`,
            token,
          });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
});
module.exports = authRouter;
