const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ email: profile.emails[0].value });

      if (user) {
        return done(null, user);
      }

      const randomPassword = Math.random().toString(36).slice(-8) + 'Google@123';

      user = await User.create({
        name: profile.displayName,
        username: profile.displayName,
        email: profile.emails[0].value,
        password: randomPassword,
        role: 'participant'
      });

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
));