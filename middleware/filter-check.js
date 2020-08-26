module.exports = (req, res, next) => {
  try {
    req.filters = {};
    if (!req.query.id && !req.query.zip) {
      res.status(400).json({ msg: "Bad request, no filters supplied" });
    }

    if (req.query.id) {
      req.filters.id = req.query.id;
    }

    if (req.query.zip) {
      req.filters.zip_id = req.query.zip;
    }

    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
