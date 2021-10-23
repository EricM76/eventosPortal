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
        
    }
}