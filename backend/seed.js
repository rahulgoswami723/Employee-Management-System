const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const Admin = require('./models/Admin');
const Employee = require('./models/Employee');

const seedAdmin = {
  name: 'Admin User',
  email: 'admin09@email.com',
  password: 'ProdigyTask2Secure!'
};

const seedEmployees = [
  {
    name: 'Ramesh kumar',
    email: 'ramesh@company.com',
    role: 'Lead Full-Stack Engineer',
    department: 'Engineering',
    salary: 95000,
    status: 'Active'
  },
  {
    name: 'Sana Singh',
    email: 'sana.singh@company.com',
    role: 'DevOps & Cloud Specialist',
    department: 'Engineering',
    salary: 92000,
    status: 'Active'
  },
  {
    name: 'Deepak Nuni',
    email: 'deepaknuni.23@company.com',
    role: 'Frontend React Developer',
    department: 'Engineering',
    salary: 78000,
    status: 'Active'
  },
  {
    name: 'Gourav Rana',
    email: 'gouravrana@email.com',
    role: 'UI/UX Product Designer',
    department: 'Design',
    salary: 74000,
    status: 'Active'
  },
  {
    name: 'Monty Sharma',
    email: 'montysharma1232@email.com',
    role: 'HR Operations Manager',
    department: 'Human Resources',
    salary: 68000,
    status: 'Active'
  },
  {
    name: 'Priya Patel',
    email: 'priya.patel@company.com',
    role: 'Talent Acquisition Partner',
    department: 'Human Resources',
    salary: 62000,
    status: 'On Leave'
  },
  {
    name: 'Sujal Kumar',
    email: 'sujalkumar1212@email.com',
    role: 'Growth Marketing Lead',
    department: 'Marketing',
    salary: 71000,
    status: 'Active'
  },
  {
    name: 'Aaliyah Khan',
    email: 'aaliyah.khan@company.com',
    role: 'Content Strategy Associate',
    department: 'Marketing',
    salary: 58000,
    status: 'Active'
  },
  {
    name: 'Venky Permi',
    email: 'venkypermi1232@email.com',
    role: 'Enterprise Account Executive',
    department: 'Sales',
    salary: 85000,
    status: 'Active'
  },
  {
    name: 'Aman Rajput',
    email: 'amanrajput1232@email.com',
    role: 'Sales Development Representative',
    department: 'Sales',
    salary: 54000,
    status: 'Terminated'
  },
  {
    name: 'Nisha Chandrakar',
    email: 'nishachandrakar1232@email.com',
    role: 'Senior Financial Analyst',
    department: 'Finance',
    salary: 88000,
    status: 'Active'
  },
  {
    name: 'Swetha Kp',
    email: 'swethakp12@email.com',
    role: 'Payroll & Accounts Specialist',
    department: 'Finance',
    salary: 114000,
    status: 'On Leave'
  },
  {
    name: 'Lovely Choubey',
    email: 'lovelychoubey876@email.com',
    role: 'Logistics Coordinator',
    department: 'Operations',
    salary: 59000,
    status: 'Active'
  }
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/employee_management';
    console.log(`[Seed] Connecting to MongoDB at ${mongoUri}...`);
    await mongoose.connect(mongoUri);

    console.log('[Seed] Clearing existing Admins and Employees...');
    await Admin.deleteMany();
    await Employee.deleteMany();

    console.log('[Seed] Creating Default Admin...');
    await Admin.create(seedAdmin);
    console.log(`[Seed] Default Admin created -> Email: ${seedAdmin.email} | Password: ${seedAdmin.password}`);

    console.log('[Seed] Inserting realistic employee dataset...');
    await Employee.insertMany(seedEmployees);
    console.log(`[Seed] Successfully inserted ${seedEmployees.length} employee records.`);

    console.log('[Seed] Seeding completed successfully.');
    process.exit(0);
  } catch (err) {
    console.error('[Seed Error]:', err);
    process.exit(1);
  }
};

seedDB();
