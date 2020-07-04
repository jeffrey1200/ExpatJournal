const Experiences = require("./experiences-model");
const experiencesRouter = require("./experiences-router");

function validateExperiencesBody(req, res, next) {
  const { body, title, user_id } = req.body;

  if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
    res.status(400).json({ error: "missing request body." });
  } else if (!body || !title || !user_id === parseInt(user_id)) {
    res.status(400).json({
      error: "Missing title, body, and user_id. user_id must be an integer",
    });
  } else {
    next();
  }
}

function validateExperienceId(req, res, next) {
  const { id } = req.params;
  Experiences.getById(id).then((experience) => {
    if (experience) {
      req.experience = experience;
      next();
    } else {
      res.status(400).json({ error: "that experience does not exist" });
    }
  });
}

module.exports = { validateExperiencesBody, validateExperienceId };
