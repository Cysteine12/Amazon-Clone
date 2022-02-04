const User = require('../models/User')
const jwt = require('jsonwebtoken')
const key = process.env.JWT_KEY

const index = async (req, res) => {
    try {
        const data = await User.find().sort({ createdAt: -1 })
        res.status(200).json({ 
            success: true,
            data: data
        })
    } catch (err) {
        res.status(404).json({ err })
    }
}

const register = async (req, res) => {
    try {
        const check = await User.findOne({ email: req.body.email })
        if (check) {
            res.status(200).json({
                msg: 'Email already exists!',
                success: false
            })
        } else {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                address: req.body.address
            })
            const data = await user.save()
    
            res.status(200).json({ 
                success: true,
                msg: 'Account Registration Successful!',
                data: data
            })
        }
    } catch (err) {
        res.status(404).json({ err })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        
        if (!user) {
            res.status(200).json({
                msg: 'Email is not found',
                success: false
            })
        } else {
            const isMatch = user.password === password
            if (!isMatch) {
                res.status(200).json({
                    msg: 'Incorrect password',
                    success: false
                })
            } else {
                const payload = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    address: user.address
                }
                jwt.sign(payload, key, {
                    expiresIn: 604800
                }, (err, token) => {
                    if (err) res.status(404).json({ err })
                    res.status(200).json({ 
                        msg: 'Login Successful',
                        success: true,
                        token: `Bearer ${token}`,
                        user: user
                    })
                })
            }
        }
    } catch (err) {
        res.status(404).json({ err })
    }
}

const profile = async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    })
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address
        }
        const data = await User.updateOne({ _id: id}, user)

        res.status(200).json({ 
            success: true,
            data: data
        })
    } catch (err) {
        res.status(404).json({ err })
    }
}

const destroy = async (req, res) => {
    try {
        const { id } = req.params
        await User.findByIdAndDelete(id)

        res.status(200).json({ 
            msg: 'Account Deleted Successfully!' 
        })
    } catch (err) {
        res.status(404).json({ err })
    }
}


module.exports = {
    index,
    register,
    login,
    profile,
    update,
    destroy
}