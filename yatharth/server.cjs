const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Mock user data
const users = [
  {
    role: 'student',
    username: 'studentUser',
    email: 'student@example.com',
    password: bcrypt.hashSync('studentPass', 8),
    studentID: '12345',
  },
  {
    role: 'parent',
    studentID: '12345',
    password: bcrypt.hashSync('parentPass', 8),
  },
  {
    role: 'admin',
    schoolID: 'school123',
    password: bcrypt.hashSync('adminPass', 8),
  },
];

const SECRET_KEY = 'yatharth';

app.post('/api/authenticate', (req, res) => {
  const { role, username, email, studentID, schoolID, password } = req.body;

  // Find the user by role and credentials
  const user = users.find((u) => {
    if (role === 'student') {
      return u.role === role && u.username === username && u.email === email;
    } else if (role === 'parent') {
      return u.role === role && u.studentID === studentID;
    } else if (role === 'admin') {
      return u.role === role && u.schoolID === schoolID;
    }
    return false;
  });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).send('Invalid credentials');
  }

  // Generate JWT token
  const token = jwt.sign({ role: user.role, id: user.id }, SECRET_KEY, {
    expiresIn: '1h',
  });

  res.json({ token });
});

// Protected route example
app.get('/api/protected', (req, res) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send('No token provided');
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).send('Failed to authenticate token');
    }
    res.status(200).send('Protected content');
  });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
