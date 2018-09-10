const passport = require('passport');

module.exports = async function (req, res, next) {
  passport.authenticate('jwt', function(err, user, info) {
    if (err) { return next(err); }
    if (!user || !Array.isArray(user.roles) || !user.roles.find(r => r == 'CREATOR')) {
      return res.forbidden();
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      req.user = user;
      return next();
    });
  })(req, res, next);
}
