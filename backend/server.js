require('dotenv').config()
const express = require('express')
// const fetch = import('node-fetch')
const jwt = require('jsonwebtoken')
const {users} = require('./users.js')
const app = express()
const port = process.env.SERVER_PORT
app.use(express.json())

const cors = require('cors');
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001']
}));

const fetchUserExternal = (res) => {
    const request = require('request');
    request({
        url:'https://dummyjson.com/users',
        method: 'GET',
        json: {}
    }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body)
        res.send(body.users)
    }
    else {
        res.send({errorMessage:'External api getusers failed'})
    }
});
}

app.get('/getProfile',verifyToken,(req, res)=>{
    const user = users.find((user)=> {
        return user.name === req.user.username
    })
    // fetchUserExternal(res)
    res.send(user)
})
app.get('/getusers',verifyToken,(req, res)=>{
    const user = users.filter((user)=> {
        return user.name === req.user.username
    })
    fetchUserExternal(res)
    // res.send(user)
})
function verifyToken(req,res,next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(!token) return res.status(401).send({errorMessage:'Token required'})
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=> {
        if(err) return res.status(403).send({errorMessage:'Invalid token'})
        req.user = user
        next()
    })
}
app.get('/',(req,res)=> {
    res.send('Welcome to Trois Infotech')
})


app.listen(5000,()=> {
    console.log(`App is listening on port ${port}`)
})