const jwt = require('jsonwebtoken');
require('dotenv').config()

const withAuth = function(req, res, next) {

  const token = 
      req.body.token ||
      req.query.token ||
      req.headers['x-access-token'] ||
      req.cookies.token;
  
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, user) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.user = user;
        // res.json(req.user)
        next();
      }
    });
  }
}

module.exports = withAuth;