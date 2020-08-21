const Joi = require("joi");

const schema = Joi.object({
  email: Joi.string().email().required().trim(),
  password: Joi.string().min(1).required().trim(),
  isGovernmentOfficial: Joi.boolean().required(),
  zipCode: Joi.number().integer().positive().required(),
});

module.exports = async (req, res, next) => {
  const bool = req.body.isGovernmentOfficial;
  if (!bool) {
    req.body.isGovernmentOfficial = false;
  } else {
    req.body.isGovernmentOfficial = true;
  }

  try {
    const { error, value } = await schema.validateAsync(req.body);
    req.validRegistration = req.body;
    next();
  } catch (error) {
    console.error(error.details[0].message);
    res.status(400).json(error.details[0].message);
  }
};
