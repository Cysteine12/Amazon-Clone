const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../src/models/User')


module.exports = (passport) => {
    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_KEY
    }, 
    async (payload, done) => {
        try {
            const user = await User.findOne({ email: payload.email })
            if(user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        } catch (err) {
            return done(err, false)
        }
    }))
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser(async (id, done) => {
        try {
            let user =  await User.findById(id)
            return done(null, user)
        } catch (err) {
            return done(err, null)
        }
    })
}