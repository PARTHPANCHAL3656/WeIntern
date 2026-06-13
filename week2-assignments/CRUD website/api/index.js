require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const Employee = require('./models/Employee');

const app = express();

// ── Middleware ────────────────────────────────────────────────────────────────

app.use(cors());
app.use(express.json());

// Connect to MongoDB on every request (safe for serverless — cached after first call)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('DB connection failed:', err.message);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// ── Routes ────────────────────────────────────────────────────────────────────

// GET /api/employees — fetch all employees, newest first
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

// POST /api/employees — create a new employee
app.post('/api/employees', async (req, res) => {
  try {
    const { name, department, role, salary, joinDate } = req.body;

    // Validate all required fields
    if (!name || !department || !role || !salary || !joinDate) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (Number(salary) <= 0) {
      return res.status(400).json({ error: 'Salary must be greater than 0' });
    }

    const employee = await Employee.create({ name, department, role, salary, joinDate });
    res.status(201).json(employee);
  } catch (err) {
    // Mongoose validation errors (e.g. maxlength)
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ error: messages.join(', ') });
    }
    res.status(500).json({ error: 'Failed to create employee' });
  }
});

// PUT /api/employees/:id — update an existing employee
app.put('/api/employees/:id', async (req, res) => {
  try {
    const { name, department, role, salary, joinDate } = req.body;

    if (!name || !department || !role || !salary || !joinDate) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (Number(salary) <= 0) {
      return res.status(400).json({ error: 'Salary must be greater than 0' });
    }

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, department, role, salary, joinDate },
      { new: true, runValidators: true } // return updated doc, run schema validators
    );

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ error: messages.join(', ') });
    }
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid employee ID' });
    }
    res.status(500).json({ error: 'Failed to update employee' });
  }
});

// DELETE /api/employees/:id — delete an employee
app.delete('/api/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid employee ID' });
    }
    res.status(500).json({ error: 'Failed to delete employee' });
  }
});

// ── Start server (for local dev without vercel dev) ──────────────────────────
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

// Export for Vercel serverless
module.exports = app;
