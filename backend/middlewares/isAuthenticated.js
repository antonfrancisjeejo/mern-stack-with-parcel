function isAuthenticated(req, res, next) {
  try {
    if (req.session.username && req.session.password) {
      next();
    } else {
      console.log(req.session.username, req.session.password);
      throw new Error("Not authorized");
    }
  } catch (error) {
    next(error);
  }
}

module.exports = isAuthenticated;

/* eslint linebreak-style: ["error", "windows"] */
