const express = require('express')
require('dotenv').config({path: '.env.local'})
const pageRouter = require('./routers/pageRouter')
const authRouter = require('./routers/authRouter')
const adminRouter = require('./routers/adminRouter')
const customerRouter = require('./routers/customerRouter')
const cors = require('cors')
const PORT = process.env.PORT || 6000

const app = express()

app.use(cors({
    origin: "http://localhost:4200"
}))

app.use(express.json())

app.use('/pages', pageRouter)
app.use('/auth', authRouter)
app.use('/admin', adminRouter)
app.use('/customer', customerRouter)

function startServer() {
    try {
        app.listen(PORT, () => console.log("SERVER IS WORKING ON PORT: ", PORT))
    } catch (error) {
        console.log(error)
    }
}
startServer()