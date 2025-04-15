const express = require('express')
const cors = require('cors')
require('dotenv').config()
const validator = require('validator')

const app = express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 5000

const users = []

app.get('/', (req,res) => {
    res.json({ success: true, data:users})
})

app.post('/users', (req,res) => {
    const { email, password } = req.body
    if(!validator.isEmail(email)){
        return res.status(400).json({success:false, message: 'Email cannot be empty'})
    }
    if(!validator.isLength(password, {min:6})){
        return res.status(400).json({success:false, message: 'Password cannot be empty and must be atleast 6 characters'})
    }
    const newUser = {id: Date.now(), email, password}
    users.push(newUser)
    res.status(201).json({success: true, data:newUser})
})


app.get('/',(req,res)=>{
    res.send('server is running')
})
app.listen(PORT, () => console.log(`server is running on port ${PORT}`))
