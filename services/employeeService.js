const User = require('../models/User');

const getEmployees = async () => {
  return await User.find({}).select('-password');
};

const createEmployee = async (employeeData) => {
  const { name, email, password, role, branchId } = employeeData;

  const userExists = await User.findOne({ email });
  if (userExists) {
    const err = new Error('User already exists');
    err.statusCode = 400;
    throw err;
  }

  const isAdmin = role === 'admin';

  return await User.create({
    name,
    email,
    password,
    role: role || 'counselor',
    branchId: branchId || undefined,
    isAdmin,
  });
};

const updateEmployee = async (id, employeeData) => {
  const user = await User.findById(id);

  if (!user) {
    const err = new Error('Employee not found');
    err.statusCode = 404;
    throw err;
  }

  if (employeeData.name !== undefined) user.name = employeeData.name;
  if (employeeData.email !== undefined) {
    // Check if email already in use by another user
    if (employeeData.email !== user.email) {
      const emailExists = await User.findOne({ email: employeeData.email });
      if (emailExists) {
        const err = new Error('Email is already in use by another user');
        err.statusCode = 400;
        throw err;
      }
    }
    user.email = employeeData.email;
  }
  if (employeeData.role !== undefined) {
    user.role = employeeData.role;
    user.isAdmin = employeeData.role === 'admin';
  }
  if (employeeData.branchId !== undefined) {
    user.branchId = employeeData.branchId || undefined;
  }
  if (employeeData.password !== undefined && employeeData.password !== '') {
    user.password = employeeData.password;
  }

  await user.save();
  
  // Return user without password
  const updatedUser = await User.findById(id).select('-password');
  return updatedUser;
};

const deleteEmployee = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    const err = new Error('Employee not found');
    err.statusCode = 404;
    throw err;
  }

  await user.deleteOne();
  return { id };
};

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
