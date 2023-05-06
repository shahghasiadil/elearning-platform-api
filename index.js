const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
require("./config/db.config");
dotenv.config();

const userRoutes = require("./routes/user.routes");
const courseRoutes = require("./routes/course.routes");
const quizRoutes = require("./routes/quiz.routes");
const forumRoutes = require("./routes/forum.routes");
const progressRoutes = require("./routes/progress.routes");
const badgeRoutes = require("./routes/badge.routes");
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api", quizRoutes);
app.use("/api/courses/:courseId/forums", forumRoutes);
app.use("/api", progressRoutes);
app.use("/api/badges", badgeRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
