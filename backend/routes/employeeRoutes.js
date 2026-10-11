const express = require('express');
const router = express.Router();
const {
  getEmployees,
  getStats,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');
const { protect } = require('../middleware/authMiddleware');

// All employee routes require admin JWT authentication
router.use(protect);

router.get('/stats', getStats);
router.get('/', getEmployees);
router.get('/:id', getEmployeeById);
router.post('/', createEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

module.exports = router;
