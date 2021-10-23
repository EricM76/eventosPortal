const db = require('../database/models');
const moment = require('moment');

module.exports = {
    index : (req,res) => {
        let activities = db.Activity.findAll()
        let events = db.Event.findAll({
            include : [
                {association : 'link'},
                {association : 'records'},
                {association : 'activity'},
                {association : 'logos'}
            ],
            order : [
                ['createdAt','DESC']
            ]
        })
        Promise.all([activities,events])
        .then(([activities,events]) => {
            return res.render('index',{
            events,
            activities,
            title : "Administración",
        })
    })
    .catch(error => console.log(error))
    },
    admin : (req,res) => {
        let activities = db.Activity.findAll()
        let events = db.Event.findAll({
            include : [
                {association : 'link'},
                {association : 'records'},
                {association : 'activity'},
                {association : 'logos'}
            ],
            order : [
                ['createdAt','DESC']
            ]
        })
        Promise.all([activities,events])
        .then(([activities,events]) => {
            return res.render('admin/index',{
            events,
            activities,
            title : "Administración"

        })
    })
        .catch(error => console.log(error))
    },
}