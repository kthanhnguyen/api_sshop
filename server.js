const express = require('express');
const mongoose = require('mongoose');

global.__basedir = __dirname;

const dotenv = require('dotenv');
dotenv.config();

// Routes
const usersRoutes = require('./routes/user.routes');
const productsRoutes = require('./routes/product.routes');
const productTypeRoutes = require('./routes/productType.routes');
const orderRoutes = require('./routes/order.routes');
const fileRoutes = require('./routes/file.routes');

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

// Routes
app.use('/users', usersRoutes);
app.use('/products', productsRoutes);
app.use('/productType', productTypeRoutes);
app.use('/orders', orderRoutes);
app.use(fileRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server run at port ${PORT}`));
