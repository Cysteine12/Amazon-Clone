module.exports = {
    ensureAdmin: (req, res, next) => {
        if (req.isAuthenticated() && req.user.role === 'admin') {
            return next()
        } else {
            res.status(200).json({
                msg: 'Unauthenticated user route',
                access: false
            })
        }
    }
}