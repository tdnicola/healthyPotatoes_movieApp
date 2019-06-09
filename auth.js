const jwtSecret = 'cannotsay'; //secret web code
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('./passport');

function generateJWTToken(user) {
  return jwt.sign(user, jwtSecret, {
    subject: user.username, //username encoding with jwt
    expiresIn: '7d', //length of token -7 days
    algorithm: 'HS256', //algorithm of coding
  });
}

// post log in
module.exports = (router) => {
  router.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        const token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
};
