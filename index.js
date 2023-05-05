const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
require('./config/db.config')

const userRoutes = require('./routes/user.routes');
const courseRoutes = require('./routes/course.routes');
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', userRoutes);
app.use('/api/courses', courseRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})
