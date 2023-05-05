const ROLE = {
  ADMIN: "admin",
  INSTRUCTOR: "instructor",
  STUDENT: "student",
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).send({ error: "Access denied." });
    }
    next();
  };
};

module.exports = { ROLE, authorize };
