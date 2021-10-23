const {body} = require('express-validator');
const db = require('../database/models');
const bcrypt = require('bcryptjs');


module.exports = [
    body('pass')
    .custom((value,{req})=>{
    
        return db.User.findOne({
            where : {
                email : req.body.email
            }
        })
        .then(user => {
            if(!user || !bcrypt.compareSync(value,user.pass)){ 
                return Promise.reject()
            }
        })
        .catch(() => Promise.reject('Credenciales inválidas')
        )
    })
]