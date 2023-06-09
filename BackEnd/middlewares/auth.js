const jwt = require('jsonwebtoken')
require('dotenv').config();

module.exports = (req, res, next) => {
    const token = req.header('accessToken')
    
    if(!token){
        return res.json({error: 'No token'})
    }
    else{
        try{
            const decodedToken = jwt.verify(token, process.env.SECRET)
            if(decodedToken){
                req.user = decodedToken
                return next()
            }
        }catch(error){
            return res.json({error: 'Wrong token'})
        }
    }
}