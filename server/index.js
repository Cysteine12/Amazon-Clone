const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/connect')

const app = express()


//=======Config========//
dotenv.config({ path: './config/config.env' })

connectDB()


//=======Middleware======//
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
    cors({
        origin: '*'
    })
)
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    })
}))

require('./config/passport-jwt')(passport)
app.use(passport.initialize())
app.use(passport.session())

//=======Routes========//
const auth = require('./src/routes/auth')
app.use('/api/auth', auth)

const product = require('./src/routes/product')
app.use('/api/product', product)

const owner = require('./src/routes/owner')
app.use('/api/owner', owner)

const category = require('./src/routes/category')
app.use('/api/category', category)


//=======........========//
const port = process.env.PORT || 5000

app.listen(port, console.log(`Server started on port ${port}`))
