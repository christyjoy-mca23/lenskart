const jwt = require('jsonwebtoken');

// Middleware to authenticate user
const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).send({ error: 'You must be logged in.' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret_key'); // Replace with your JWT secret
    req.user = decoded; // Add the decoded user data to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(401).send({ error: 'Invalid token.' });
  }
};

module.exports = authenticateUser;
