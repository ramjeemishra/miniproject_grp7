const mongoose = require('mongoose');

async function addEmployees() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/employeeDB');

    const employees = mongoose.connection.collection('employees');
    const count = await employees.countDocuments();

    if (count === 0) {
      await employees.insertMany([
        { name: 'Amit Sharma', email: 'amit@example.com', department: 'IT' },
        { name: 'Priya Patel', email: 'priya@example.com', department: 'HR' },
        { name: 'Rahul Verma', email: 'rahul@example.com', department: 'Sales' },
      ]);
      console.log('Added 3 employees');
    } else {
      console.log('Employees already exist. Nothing added.');
    }
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

addEmployees();
