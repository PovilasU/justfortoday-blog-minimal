const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

const users = []; // In-memory storage (replace with DB or file in production)
const JWT_SECRET = 'your_jwt_secret_here'; // Store securely in .env in production

// 🔐 Middleware: Auth check for protected routes
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token trūksta' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Netinkamas tokenas' });
    req.user = user;
    next();
  });
}

// 📝 POST /register – Register a new user
router.post('/register', async (req, res) => {
  const { username, password, name } = req.body;

  if (!username || !password || !name) {
    return res.status(400).json({ error: 'Trūksta laukų (vardas, el. paštas, slaptažodis)' });
  }

  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(400).json({ error: 'Vartotojas jau egzistuoja' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword, name });
    res.status(201).json({ message: 'Registracija sėkminga' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Klaida registruojant' });
  }
});

// 🔑 POST /login – Log in user and return JWT
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ error: 'Neteisingi prisijungimo duomenys' });

  try {
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ error: 'Neteisingi prisijungimo duomenys' });

    const token = jwt.sign(
      { username: user.username, name: user.name }, // Payload
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, name: user.name });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Klaida prisijungiant' });
  }
});

// 🔐 GET /protected – Example protected route
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: `Sveikas, ${req.user.name || req.user.username}` });
});

module.exports = router;
