const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  department: String,
});

const Employee = mongoose.model('employee', employeeSchema);

app.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'cannot fetch employes' });
  }
});

async function startServer() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/employeeDB');
    console.log('mongodb connected');

    app.listen(5001, (error) => {
      if (error) {
        console.error(error.message);
        process.exit(1);
      }
      console.log('server running at http://localhost:5001');
    });
  } catch (error) {
    console.error('DB connection failed:', error.message);
    process.exit(1);
  }
}

startServer();
