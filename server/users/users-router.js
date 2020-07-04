const userRouter = require("express").Router();

const Users = require("./users-model");

userRouter.get("/", (req, res) => {
  Users.getAll()
    .then((allUsers) => {
      allUsers.map((users) => {
        delete users.password;
        return users;
      });
      res.status(200).json(allUsers);
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: "oops, something went wrong with the server" })
    );
});

userRouter.get("/:id", checkId, (req, res) => {
  const user = req.user;
  res.status(200).json(user);
});

userRouter.get("/:id/experiences", checkId, (req, res) => {
  const { id } = req.params;

  Users.getUserExperiences(id)
    .then((UserExperiences) => {
      res.status(200).json(UserExperiences);
    })
    .catch((err) => err);
});

userRouter.put("/:id", checkId, (req, res) => {
  const { id } = req.params;
  const body = req.body;
  Users.update(id, body)
    .then((updatedUser) => {
      delete updatedUser.password;
      res.status(200).json(updatedUser);
    })
    .catch((err) => err);
});

userRouter.delete("/:id", checkId, (req, res) => {
  const { id } = req.params;
  Users.remove(id)
    .then((deleteUser) => {
      res.status(200).json({
        message: "The user has been successfully removed from the database",
      });
    })
    .catch((err) => err);
});
function checkId(req, res, next) {
  const { id } = req.params;
  Users.findUserById(id)
    .then((user) => {
      if (user) {
        delete user.password;
        req.user = user;
        next();
      } else {
        res.status(404).json({ message: `there is no user with id of ${id}` });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "oops, something went wrong", error: err.message });
    });
}

module.exports = userRouter;
