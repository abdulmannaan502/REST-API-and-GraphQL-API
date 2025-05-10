const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());

//Welcome Message
app.get('/', (req, res) => {
  res.send('👋 Welcome to the User Info API!');
});


//Sampledata
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

//Get All Users
app.get('/users', (req, res) => {
  res.json(users);
});

 //Get One User by ID
 app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

//Create a New User
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  const newUser = {
    id: users.length + 1,
    name,
    email
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

//Update a User
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });
  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;
  res.json(user);
});

//Delete a User
app.delete('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'User not found' });
  const deletedUser = users.splice(index, 1);
  res.json(deletedUser[0]);
});

app.listen(PORT, () => {
  console.log(`User Info API running on http://localhost:${PORT}`);
});

//JWT
// Generate token (on login)
const jwt = require('jsonwebtoken');
const token = jwt.sign({ userId: 1 }, 'your-secret-key', { expiresIn: '1h' });

// Protect routes with middleware
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access Denied');
  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) return res.status(400).send('Invalid Token');
    req.userId = decoded.userId;
    next();
  });
};

//Rate Limiting
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // limit each IP to 100 requests per windows
  message: 'Too many requests, please try again later.'
});

app.use(limiter);

//Data Validation & Sanitization
const { body, validationResult } = require('express-validator');

app.post('/users', [
  body('email').isEmail(),
  body('name').notEmpty()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Create the user...
});

//CORS
const cors = require('cors');
app.use(cors());

//Pagination and Filtering
app.get('/users', (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedUsers = users.slice(startIndex, endIndex);
  res.json(paginatedUsers);
});

//Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!' });
});

//API Documentation
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Testing
const request = require('supertest');
const app = require('../server');

describe('GET /users', () => {
  it('should return a list of users', async () => {
    const res = await request(app).get('/users');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });
});
