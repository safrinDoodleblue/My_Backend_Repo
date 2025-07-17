
const LocalStrategy = require('passport-local').Strategy;
const userService = require('../User/userService');
const passport = require('passport');

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const { user, message } = await userService.verifyUser(email, password);
      if (!user) {
        return done(null, false, { message });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);



passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
