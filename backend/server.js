// importing dependencies
const express = require('express');
const pathToSwaggerUi = require('swagger-ui-dist').absolutePath();
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(express.static(pathToSwaggerUi));
const PORT = process.env.PORT || 8080;
require('dotenv/config');
const appRoutes = require('./routes/index');

// using middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(bodyparser.json());
app.use('/api', appRoutes);

// endpoint test
app.get(
  '/',
  (error, req, res) => {
    console.log(error.message);
    res.status(error.status).json({
      status: error.status,
      message: error.message,
    });
  },
  (req, res) => {
    res.status(200).json({
      message: 'welcome to our  voting app',
    });
  },
);

// server activation
app.listen(PORT, () => {
  console.log(`server running on port${PORT}`);
});
