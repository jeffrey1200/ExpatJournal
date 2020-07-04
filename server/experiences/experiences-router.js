const experiencesRouter = require("express").Router();

const Experiences = require("./experiences-model");

const {
  validateExperiencesBody,
  validateExperienceId,
} = require("./experiences-middleware");
experiencesRouter.get("/", (req, res) => {
  Experiences.getAll()
    .then((allPost) => {
      res.status(200).json(allPost);
    })
    .catch((err) => err);
});

experiencesRouter.get("/:id", (req, res) => {
  const { id } = req.params;

  Experiences.getById(id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => err);
});

experiencesRouter.post("/", validateExperiencesBody, (req, res) => {
  const postBody = req.body;

  Experiences.insert(postBody)
    .then((post) => {
      if (post) {
        res.status(201).json(post);
      }
    })
    .catch((err) => res.status(500).json(err));
});

experiencesRouter.put(
  "/:id",
  [validateExperienceId, validateExperiencesBody],
  (req, res) => {
    const changes = req.body;
    const { id } = req.params;

    Experiences.update(id, changes)
      .then((updated) => {
        res
          .status(200)
          .json({ message: "Successfully Updated Experience", updated });
      })
      .catch((err) => res.status(500).json(err));
  }
);

experiencesRouter.delete("/:id", validateExperienceId, (req, res) => {
  const { id } = req.params;
  Experiences.remove(id)
    .then((removed) => {
      res
        .status(200)
        .json({ message: `Successfully deleted ${removed} experience` });
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = experiencesRouter;
