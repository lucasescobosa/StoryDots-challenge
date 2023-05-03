const jwt = require('jsonwebtoken')
const db = require('../database/models');
require('dotenv').config();

const usersController = {

    login: async (req, res) => {
        const {username, password} = req.body;
        if(username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign({
                user: username,
            }, process.env.SECRET)
            
            res.json({
                token
            })
        }
        else{
            res.json({
                error: 'credenciales incorrectas'
            })
        }
    },
}

module.exports = usersController;