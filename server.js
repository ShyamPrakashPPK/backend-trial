const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = 3002;

// Hardcoded user object for demonstration purposes
const users = [
    {
        id: 1,
        username: 'shyam',
        password: 'password1',
        profilePicture: '',
        subdomain: 'shyam123',
        Object: {
            Business: 'restaurant'
        }
    },
    {
        id: 2,
        username: 'user2',
        password: 'password2'
    }
];

// Create a separate JSON Server instance


app.use(express.json());

// Enable CORS for all routes
app.use(cors({ origin: '*', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' })); 


// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id, username: user.username }, 'yourSecretKey', { expiresIn: '1h' });
    res.json({
        userData: {
            id: user.id,
            username: user.username,
        },
        accessToken: token,
    });
});


// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, 'keyyyyyyya1234412566sdfgasdfasdf', (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        req.user = user;
        next();
    });
}





app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});