const db = require('../database/models');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');


module.exports = {
    register : (req,res) => {
        return res.render('admin/register',{
            title : "Nuevo administrador"
        });
    },
    processRegister : (req,res) => {
        let errors = validationResult(req);
        const {name,email,pass,recordar} = req.body;
        if (errors.isEmpty()) {
        db.User.create({
            name,
            email,
            pass : bcrypt.hashSync(pass)
        }).then(user => {
            return res.redirect('/users/list')
        }).catch(error => console.log(error));
    }else{
        res.render('admin/register',{
            old : req.body,
            errores : errors.mapped(),
            title : "Nuevo administrador"
        })
    }
    },
    login : (req,res) => {
        return res.render('admin/login',{
            title : "Login Idud Aliá"
        });
    },
    processLogin : (req,res) => {
        let errors = validationResult(req);
        const {email, recordar} = req.body;
        if (errors.isEmpty()) {
            db.User.findOne({
                where : {
                    email
                }
            })
            .then(user => {
                req.session.adminLogin = {
                    id : user.id,
                    name : user.name,
                }
                if(recordar){
                    res.cookie('idudalia',req.session.adminLogin,{
                        maxAge : 1000 * 60
                    })
                }
                return res.redirect('/admin')
            })
            .catch(error => console.log(error))
        }else{
            res.render('admin/login',{
                old : req.body,
                errores : errors.mapped(),
                title: "Login Idud Aliá"
            })
        }

    },
    remove : (req,res) => {
        db.User.destroy({
            where : {
                id : +req.params.id
            }
        })
        .then( () => {
            res.redirect('/users/list')
        })
        .catch(error => console.log(error))
    },
    list : (req,res) => {
        db.User.findAll()
        .then(users => {
            return res.render('admin/adminList',{
                users
            })
        })
        .catch(error => console.log(error))
    },
    logout : (req,res) => {
        req.session.destroy();
        req.cookies.idudalia ? res.cookie('idudalia','',{maxAge:-1}) : null;
        return res.redirect('/admin');
    }
}