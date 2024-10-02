const AdminMiddleWare = (req, res, next) => {
  console.log("hello from middleware");
  const role = "admin";
  if (role == "admin") {
    next();
  } else {
    res.status(401).send("Not authorized");
  }
};
module.exports = {
  AdminMiddleWare,
};
