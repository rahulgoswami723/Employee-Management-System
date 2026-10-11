const Employee = require('../models/Employee');

// @desc    Get all employees with optional search, department/status filter, and pagination
// @route   GET /api/employees
// @access  Private
exports.getEmployees = async (req, res) => {
  try {
    const {
      search = '',
      department = '',
      status = '',
      page = 1,
      limit = 10
    } = req.query;

    const query = {};

    // Live search by name, email, or role
    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { name: searchRegex },
        { email: searchRegex },
        { role: searchRegex }
      ];
    }

    // Filter by department
    if (department && department !== 'All') {
      query.department = department;
    }

    // Filter by status
    if (status && status !== 'All') {
      query.status = status;
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const skip = (pageNum - 1) * limitNum;

    const [employees, total] = await Promise.all([
      Employee.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      Employee.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limitNum) || 1;

    return res.status(200).json({
      success: true,
      data: employees,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages
      }
    });
  } catch (error) {
    console.error('[GetEmployees Error]:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error fetching employees list.'
    });
  }
};

// @desc    Get dashboard metrics (Total, Active, On Leave, Terminated, Dept Breakdown)
// @route   GET /api/employees/stats
// @access  Private
exports.getStats = async (req, res) => {
  try {
    const [
      totalEmployees,
      activeEmployees,
      onLeaveEmployees,
      terminatedEmployees,
      deptBreakdown
    ] = await Promise.all([
      Employee.countDocuments(),
      Employee.countDocuments({ status: 'Active' }),
      Employee.countDocuments({ status: 'On Leave' }),
      Employee.countDocuments({ status: 'Terminated' }),
      Employee.aggregate([
        { $group: { _id: '$department', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ])
    ]);

    return res.status(200).json({
      success: true,
      stats: {
        totalEmployees,
        activeEmployees,
        onLeaveEmployees,
        terminatedEmployees,
        departmentCount: deptBreakdown.length,
        deptBreakdown
      }
    });
  } catch (error) {
    console.error('[GetStats Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve stats.'
    });
  }
};

// @desc    Get single employee by ID
// @route   GET /api/employees/:id
// @access  Private
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found.'
      });
    }
    return res.status(200).json({
      success: true,
      data: employee
    });
  } catch (error) {
    console.error('[GetEmployeeById Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching employee record.'
    });
  }
};

// @desc    Create new employee record
// @route   POST /api/employees
// @access  Private
exports.createEmployee = async (req, res) => {
  try {
    const { name, email, role, department, salary, status } = req.body;

    if (!name || !email || !role || !department || salary === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, role, department, salary.'
      });
    }

    const existingEmployee = await Employee.findOne({ email: email.toLowerCase().trim() });
    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: 'An employee with this email already exists.'
      });
    }

    const employee = await Employee.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      role: role.trim(),
      department,
      salary: Number(salary),
      status: status || 'Active'
    });

    return res.status(201).json({
      success: true,
      message: 'Employee record created successfully.',
      data: employee
    });
  } catch (error) {
    console.error('[CreateEmployee Error]:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error while creating employee.'
    });
  }
};

// @desc    Update employee record
// @route   PUT /api/employees/:id
// @access  Private
exports.updateEmployee = async (req, res) => {
  try {
    const { name, email, role, department, salary, status } = req.body;

    let employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found.'
      });
    }

    // Check duplicate email if email was changed
    if (email && email.toLowerCase().trim() !== employee.email) {
      const emailExists = await Employee.findOne({
        email: email.toLowerCase().trim(),
        _id: { $ne: req.params.id }
      });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: 'This email is already in use by another employee.'
        });
      }
    }

    const updateFields = {};
    if (name !== undefined) updateFields.name = name.trim();
    if (email !== undefined) updateFields.email = email.toLowerCase().trim();
    if (role !== undefined) updateFields.role = role.trim();
    if (department !== undefined) updateFields.department = department;
    if (salary !== undefined) updateFields.salary = Number(salary);
    if (status !== undefined) updateFields.status = status;

    employee = await Employee.findByIdAndUpdate(req.params.id, updateFields, {
      new: true,
      runValidators: true
    });

    return res.status(200).json({
      success: true,
      message: 'Employee updated successfully.',
      data: employee
    });
  } catch (error) {
    console.error('[UpdateEmployee Error]:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error while updating employee.'
    });
  }
};

// @desc    Delete employee record
// @route   DELETE /api/employees/:id
// @access  Private
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found.'
      });
    }

    await Employee.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: `Employee ${employee.name} deleted successfully.`
    });
  } catch (error) {
    console.error('[DeleteEmployee Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while deleting employee.'
    });
  }
};
