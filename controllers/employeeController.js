const Employee = require('../models/index');

// Get all employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    console.log("employees");
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Create an employee
const createEmployee = async (req, res) => {
  const { newData } = req.body
  try {
    newData.forEach(async (item) => {
      const [employeeID, firstName, lastName, dateOfBirth, role] = item;
      try {
        const employee = new Employee({
          employeeID,
          firstName,
          lastName,
          dateOfBirth: new Date(dateOfBirth),
          role
        });

        await employee.save();
        console.log('Employee created:', employee);
      } catch (error) {
        console.error('Error creating employee:', error);
      }
    });
    res.status(201).json({
      success: true,
      message: 'Data Added Successfully'
    })
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

// Update an employee
// const updateEmployee = async (req, res) => {
//   try {
//     const employee = await Employee.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!employee) {
//       return res.status(404).json({ error: 'Employee not found' });
//     }
//     res.json(employee);
//   } catch (error) {
//     res.status(400).json({ error: 'Invalid data' });
//   }
// };

// // Delete an employee
// const deleteEmployee = async (req, res) => {
//   try {
//     const employee = await Employee.findByIdAndDelete(req.params.id);
//     if (!employee) {
//       return res.status(404).json({ error: 'Employee not found' });
//     }
//     res.json({ message: 'Employee deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
