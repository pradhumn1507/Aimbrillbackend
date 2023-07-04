const express = require('express');
const mongoose = require('mongoose');
const employeeRoutes = require('./routes/employeeRoutes');
const cors = require('cors')

const app = express();
const PORT = 5000;

// Connect to MongoDB
const mongoDB = () => {
  mongoose.connect('mongodb+srv://shellu:8560892164@cluster0.nmna7re.mongodb.net/')
  .then(() => {
      console.log("MongoDb database is connected!");
  })
  .catch((error) => {
      console.log(error);
  });
}
mongoDB();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Routes
app.use('/api/employees', employeeRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
