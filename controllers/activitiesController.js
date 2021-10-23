const db = require('../database/models');
const {Op} = require('sequelize');

module.exports = {
    add : (req,res) => {
        return res.render('admin/activityAdd',{
            title : "Nueva actividad",
        })
    },
    save : (req,res) => {
       db.Activity.create({
           name : req.body.name
       })
       .then(()=> res.redirect('/activities/list'))
       .catch(error => console.log(error))
    },
    list : (req,res) => {
        db.Activity.findAll({
            include:[
                {association : "events"},
            ]
        })
        .then(activities => {
            return res.render('admin/activityList',{
                activities,
                title : "Lista de actividades",
                message : "No hay actividades agregadas"
            })
        })
        .catch(error => console.log(error))

    },
    edit : (req,res) => {

    },
    update : (req,res) => {
        db.Activity.update({
            name : req.body.name
        },
        {
            where : {
                id: req.params.id
            }
        })
        .then( ()=> res.redirect('/activities/list'))
        .catch(error => console.log(error))
    },
    remove : (req,res) => {
     db.Activity.destroy({
         where : {
             id : req.params.id
         }
     })
     .then(()=>res.redirect('/activities/list'))
     .catch(error => console.log(error))
    },
    search : (req,res) => {
        db.Activity.findAll({
            where : {
                name: {
                    [Op.substring]: req.query.search.trim(),
                },
            },
            include:[
                {association : "events"},
            ]
        })
        .then(activities => {
            if(activities){
                return res.render('admin/activityList',{
                    activities,
                    title : "Resultado de la búsqueda",
                    message : `No hay resultados para búsqueda '${req.query.search}'`

                })
            }else{
                return res.render('admin/activityList',{
                    activities,
                    title : "Resultado de la búsqueda",
                    message : "Resultados para búsqueda de " + req.query.search
                }) 
            }
           
        })
        .catch(error => console.log(error))
    }
   
}