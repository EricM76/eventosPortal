const db = require("../database/models");

module.exports = {
    logos : (req,res) => {
        db.Event.findOne({
            where : {
                id : req.query.id
            },
            include : [
                {association : "logos"}
            ]
        })
        .then(events => {
            res.status(200).json({logos:events.logos});
        })
        .catch(error => console.log(error));
    },
    removeLogos : (req,res) =>{
        db.Logo.destroy({
            where: {
                eventId : req.query.id
            }
        })
        .then(()=>console.log('logos elimindos'))
        .catch(error => console.log(error))
        
    },
    getCallingCodes : (req,res) => {
        db.Country.findOne({
            where : {
                name : req.params.name
            }
        })
        .then(country => res.status(200).json({callingCode : country.callingCode}))
        .catch(error => {
            res.status(500).json(error)
            console.log(error)
        })

    },
    changeActive : (req,res) => {
        db.Event.update(
        {
            active : req.body.active
        },
           {
            where : {
                id : +req.body.id
            }
        },
        )
        .then( () => res.status(200).json('cambio realizado'))
        .catch(error => {
            res.status(500).json(error)
            console.log(error)
        })
    },
    removeRecord : (req,res) => {
        db.Record.destroy({
            where : {
                id : +req.body.id
            }
        })
        .then( () => res.status(200).json('inscripción eliminada'))
        .catch(error => {
            res.status(500).json(error)
            console.log(error)
        })
    }
}