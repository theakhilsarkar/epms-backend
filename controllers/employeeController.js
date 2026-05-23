const asyncHandler = require('../utils/asyncHandler');
const employeeService = require('../services/employeeService');

// @desc    Get all employees
// @route   GET /api/employees
// @access  Private/Admin
const getEmployees = asyncHandler(async (req, res) => {
  try {
    const data = await employeeService.getEmployees();
    res.status(200).json({
      success: true,
      message: 'Employees retrieved successfully',
      data,
    });
  } catch (error) {
    res.status(error.statusCode || 500);
    throw error;
  }
});

// @desc    Create a new employee
// @route   POST /api/employees
// @access  Private/Admin
const createEmployee = asyncHandler(async (req, res) => {
  try {
    const data = await employeeService.createEmployee(req.body);
    res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      data,
    });
  } catch (error) {
    res.status(error.statusCode || 400);
    throw error;
  }
});

// @desc    Update an employee
// @route   PUT /api/employees/:id
// @access  Private/Admin
const updateEmployee = asyncHandler(async (req, res) => {
  try {
    const data = await employeeService.updateEmployee(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: 'Employee updated successfully',
      data,
    });
  } catch (error) {
    res.status(error.statusCode || 400);
    throw error;
  }
});

// @desc    Delete an employee
// @route   DELETE /api/employees/:id
// @access  Private/Admin
const deleteEmployee = asyncHandler(async (req, res) => {
  try {
    const data = await employeeService.deleteEmployee(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Employee deleted successfully',
      data,
    });
  } catch (error) {
    res.status(error.statusCode || 404);
    throw error;
  }
});

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
