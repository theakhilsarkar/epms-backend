const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validationMiddleware');

// Secure all routes with authentication and check that user is an admin
router.use(protect);
router.use(authorizeRoles('admin'));

router
  .route('/')
  .get(getEmployees)
  .post(
    [
      body('name', 'Name is required').notEmpty(),
      body('email', 'Please include a valid email').isEmail(),
      body('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
      body('role', 'Role is required').notEmpty(),
    ],
    validateRequest,
    createEmployee
  );

router
  .route('/:id')
  .put(
    [
      body('name', 'Name must not be empty').optional().notEmpty(),
      body('email', 'Please include a valid email').optional().isEmail(),
      body('role', 'Role must not be empty').optional().notEmpty(),
    ],
    validateRequest,
    updateEmployee
  )
  .delete(deleteEmployee);

module.exports = router;
