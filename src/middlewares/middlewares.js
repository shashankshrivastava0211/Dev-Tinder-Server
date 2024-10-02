const AdminMiddleware = (req, res, next) => {
  console.log("hello from middleware");
  const { role } = req.query; // Get the role from query params for testing
  if (role === "admin") {
    next();
  } else {
    res.status(401).send("Not authorized");
  }
};

const UserMiddleware = (req, res, next) => {
  const { role } = req.query; // Get the role from query params for testing
  if (role === "user" || "admin") {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

module.exports = {
  AdminMiddleware,
  UserMiddleware,
};
