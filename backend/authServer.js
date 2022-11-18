require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const {users} = require('./users.js')
const app = express()
const port = process.env.AUTH_SERVER_PORT
app.use(express.json())

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000'
}));

let refreshTokens = {}
const accessTokenExp = '2m'
const refreshTokenExp = '4m'

app.post('/login',(req, res)=>{
    const username = req.body.username
    if(!users.find(user=>user.name===username)) 
        res.status(203).send({message:'User not exist'})
    res.json(generateTokens(username))
})

app.post('/logout',(req, res)=>{
    console.log(refreshTokens)

    delete refreshTokens[req.body.token]
    console.log('after')
    console.log(refreshTokens)
    res.sendStatus(204)
})


app.post('/refreshToken',(req, res) => {
    if(!req.body.token) return res.sendStatus(401)
    if(!Object.keys(refreshTokens).find(key=>req.body.token === refreshTokens[key])) return res.status(404).send('Token not found')
    // if(!refreshTokens.includes(req.body.token)) return res.status(404).send('Token not found')
    jwt.verify(req.body.token,process.env.REFRESH_TOKEN_SECRET,(err, user) => {
        if(err) return res.status(403).send('Token Expired')
        if(user) res.send(generateTokens(req.body.name))
    })
})

function generateTokens(username) {
    const user = {username : username}
    const accessToken = generateAccessToken(user,accessTokenExp)
    const refreshToken = generateRefreshToken(user,refreshTokenExp)
    refreshTokens[refreshToken] = refreshToken
    return {username: username,accessToken: accessToken,refreshToken:refreshToken}
}

function generateAccessToken(obj,exp){
    return jwt.sign(obj,process.env.ACCESS_TOKEN_SECRET,{expiresIn:exp ? exp : '60s'})
}
function generateRefreshToken(obj,exp){
    return jwt.sign(obj,process.env.REFRESH_TOKEN_SECRET,{expiresIn:exp ? exp : '60s'})
}
app.listen(port,()=> {
    console.log(`Auth server is listening on port ${port}`)
})