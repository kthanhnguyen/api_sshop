const express = require('express');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

// Routes
const usersRoutes = require('./routes/user.routes');

const app = express();

// BodyParser Middleware
app.use(express.json());

// Connet to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

//  User routes
app.use('/users', usersRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server run at port ${PORT}`));
