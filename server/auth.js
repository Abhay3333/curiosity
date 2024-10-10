// auth.js
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('./db/user');
require('dotenv').config();

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/user/auth/callback',
    passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, done) => {
    try {
        // You can save the access token to the user object if needed
        const user = {
            githubId: profile.id,
            username: profile.username,
            accessToken: accessToken, // Save the access token
            email: profile.email,
            avatar: profile.avatar_url,

        };
        
        // Save user to your database here if not exists
        const exists = await User.findOne({ githubId: profile.id });
        if (exists) {
            return done(null, exists);
        }
        const newUser = await User.create(user);
        done(null, newUser);
    } catch (error) {
        done(error);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

module.exports = passport ;
