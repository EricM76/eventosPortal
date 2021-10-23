const db = require("../database/models");
const moment = require('moment');
const { Op } = require("sequelize");
const xl = require('excel4node');


module.exports = {
    add: (req, res) => {
        db.Activity.findAll()
            .then((activities) => {
                return res.render("admin/addEvent", {
                    activities,
                    title : "Lista de actividades",
                });
            })
            .catch((error) => console.log(error));
    },
    save: (req, res) => {
        const {
            name,
            subtitle,
            speaker,
            activityId,
            date,
            description,
            plataform,
            connection,
            location,
            modality,
            colorPrimary,
        } = req.body;
        db.Event.create({
            name,
            subtitle,
            speaker,
            description,
            date,
            plataform,
            connection,
            location,
            modality,
            colorPrimary,
            activityId,
        })
            .then((event) => {
                if(req.files.length!=0){
                    let logo;
                let logos = [];
                for (let i = 0; i < req.files.length; i++) {
                    logo = {
                        name: req.files[i].filename,
                        eventId: event.id,
                    };
                    logos.push(logo);
                }
                db.Logo.bulkCreate(logos, { validate: true })
                    .then(() => {
                        db.Link.create({
                            //route: req.protocol + '://' + req.get("host") + "/records/register/" + event.id,
                            route: 'https://' + req.get("host") + "/records/register/" + event.id,
                            eventId: event.id,
                        }).then((link) => {
                            db.Event.findAll({
                                include: [{ association: "link" }, { association: "records" }],
                            }).then(() => {
                                return res.redirect('/admin?event=success');
                            });
                        });
                    })
                }else{
                    db.Link.create({
                        route: 'https://' + req.get("host") + "/records/register/" + event.id,
                        eventId: event.id,
                    }).then((link) => {
                        db.Event.findAll({
                            include: [{ association: "link" }, { association: "records" }],
                        }).then(() => {
                            return res.redirect('/admin?event=success');
                        });
                    });
                }
                
            })
            .catch((error) => console.log(error));
    },
    detail: (req, res) => {
        db.Event.findOne({
            where: {
                id: req.params.id,
            },
            include: [
                { association: "link" }, 
                { association: "records" },
                { association: "activity"},
                { association: "logos"}
            ],
        })
            .then((event) => {
                let date = moment.parseZone(event.date).local().format('DD/MM/YYYY');
                res.render("admin/detailEvent", {
                    event,
                    title : "Detalle del evento",
                    date
                })
            }
               
            )
            .catch((error) => console.log(error));
    },
    edit: (req, res) => { 
        let activities = db.Activity.findAll()
        let event = db.Event.findOne({
            where : {
                id: req.params.id
            },
            include :[
                { association: "link" }, 
                { association: "records" },
                { association: "activity"},
                { association: "logos"}
            ]
        })
        Promise.all([activities,event])
        .then(([activities,event]) => {
            let fecha = new Date(event.date)
            res.render('admin/editEvent',{
                event,
                activities,
                title: "Editar evento",
                fecha : new Date(fecha.getTime() + new Date().getTimezoneOffset() * -60 * 1000).toISOString().slice(0, 19)
            })
        })
    },
    update: (req, res) => { 
        const {
            name,
            subtitle,
            speaker,
            activityId,
            date,
            description,
            plataform,
            connection,
            location,
            modality,
            colorPrimary,
        } = req.body;
        db.Event.update(
            {
                name,
                subtitle,
                speaker,
                activityId,
                date,
                description,
                plataform,
                connection,
                location,
                modality,
                colorPrimary,
            },
            {
                where : {
                    id: req.params.id
                }
            })
        .then(result => {

            if(req.files.length!=0){
                let logo;
                let logos = [];
            for (let i = 0; i < req.files.length; i++) {
                logo = {
                    name: req.files[i].filename,
                    eventId: req.params.id,
                };
                logos.push(logo);
            }
            db.Logo.bulkCreate(logos, { validate: true })
                .then(() => {
                    db.Event.findAll({
                        include: [{ association: "link" }, { association: "records" }],
                    }).then(() => {
                        return res.redirect('/admin');
                    });
                })
            }else{
                db.Event.findAll({
                    include: [{ association: "link" }, { association: "records" }],
                }).then(() => {
                    return res.redirect('/admin');
                });
            }
        })
        .catch(error => console.log(error))
    },
    remove: (req, res) => {
        db.Event.destroy({
            where: {
                id: req.params.id,
            },
        })
            .then(() => res.redirect("/admin"))
            .catch((error) => console.log(error));
    },
    activity: (req,res) => {
        let activities = db.Activity.findAll();
        if(req.body.activity == 0){
            var events = db.Event.findAll({
                include : [
                    {association : 'link'},
                    {association : 'records'},
                    {association : 'activity'},
                    {association : 'logos'}
                ]
            })
        }else{
            var events = db.Event.findAll({
                where : {
                    activityId : req.body.activity
                },
                include : [
                    {association : 'link'},
                    {association : 'records'},
                    {association : 'activity'},
                    {association : 'logos'}
                ]
            })
        }
        Promise.all([activities,events])
        .then(([activities,events]) => {
            if(events.length == 0){
                return res.render('admin/index',{
                    events,
                    activities,
                    title : "Administración",
                    message : "No hay eventos vinculados con esta actividad"
                    })
            }
            return res.render('admin/index',{
            events,
            activities,
            title : "Administración",
            })
        })
        .catch(error => console.log(error))
    },
    search : (req,res) => {
        let activities = db.Activity.findAll()
        let events = db.Event.findAll({
            where : {
                name: {
                    [Op.substring]: req.query.search.trim(),
                },
            },
            include : [
                {association : 'link'},
                {association : 'records'},
                {association : 'activity'},
                {association : 'logos'}
            ]
        })
        Promise.all([activities,events])
        .then(([activities,events]) => {
            if(events.length == 0){
                return res.render('admin/index',{
                    events,
                    activities,
                    title : "Administración",
                    message : `No hay resultados para búsqueda '${req.query.search}'`
                    })
            }
            return res.render('admin/index',{
            events,
            activities,
            title : "Administración",
            })
        })
        .catch(error => console.log(error))
    },
    order : (req,res) => {
        const dataOrder = (column,scale) => {
            var activities = db.Activity.findAll();
            var events = db.Event.findAll({
                order: [
                    [column, scale]
                  ],
                include : [
                    {association : 'link'},
                    {association : 'records'},
                    {association : 'activity'},
                    {association : 'logos'}
                ]
            })
            return [activities,events]
        }
        const dataUrder = () => {
            var activities = db.Activity.findAll();
            var events = db.Event.findAll({
                include : [
                    {association : 'link'},
                    {association : 'records'},
                    {association : 'activity'},
                    {association : 'logos'}
                ]
            })
            return [activities,events]
        }

        switch (req.query.order) {
            case 'evento':
                Promise.all(dataOrder('name','ASC'))
                .then(([activities,events]) => {
                    return res.render('admin/index',{
                    events,
                    activities,
                    title : "Administración",
                    })
                })
                .catch(error => console.log(error))
                break;
            case 'fecha':
                Promise.all(dataOrder('date','ASC'))
                .then(([activities,events]) => {
                    return res.render('admin/index',{
                    events,
                    activities,
                    title : "Administración",
                    })
                })
                .catch(error => console.log(error))
                break;
            case 'actividad':
                Promise.all(dataUrder())
                .then(([activities,events]) => {
                    events.sort(function (a, b){
                        return ( a.activity.name.toLowerCase().localeCompare(b.activity.name.toLowerCase()))
                    });
                    return res.render('admin/index',{
                    events,
                    activities,
                    title : "Administración",
                    })
                })
                .catch(error => console.log(error))
                break;
            case 'inscriptos':
                Promise.all(dataUrder())
                .then(([activities,events]) => {
                    events.sort(function (a, b){
                        return (a.count().records-b.count().records)
                    });
                    return res.render('admin/index',{
                    events,
                    activities,
                    title : "Administración",
                    })
                })
                .catch(error => console.log(error))
                break
            default:
                Promise.all(dataOrder('createdAt','DESC'))
                .then(([activities,events]) => {
                    return res.render('admin/index',{
                    events,
                    activities,
                    title : "Administración",
                    })
                })
                .catch(error => console.log(error))
                break;
        }
    },
    createExcel :(req,res) => {
        db.Record.findAll({
            include: [
                {association : 'event',
                    include :[
                        {association: 'activity'}
                    ]}
            ]
        })
        .then(records => {
            let wb = new xl.Workbook();
            let ws = wb.addWorksheet('Informe');

            // Create a reusable style
            let style = wb.createStyle({
                font: {
                color: '#666666',
                size: 12,
                },
            });

            ws.cell(1, 1, 1, 11, true)
            .string('Informe de inscriptos al ' + moment.parseZone(new Date()).local().format('DD/MM/YYYY'))
            .style(style)
            .style({
                alignment:{
                    vertical : 'center',
                    horizontal : 'center'
                }
            })

            ws.row(1).setHeight(50);
            ws.column(1).setWidth(4);
            ws.column(2).setWidth(20);
            ws.column(3).setWidth(20);
            ws.column(4).setWidth(15);
            ws.column(5).setWidth(15);
            ws.column(6).setWidth(25);
            ws.column(7).setWidth(15);
            ws.column(8).setWidth(15);
            ws.column(9).setWidth(15);
            ws.column(10).setWidth(15);
            ws.column(11).setWidth(15);



            // Create headers
            let titles = ['#','Nombre','Apellido','Género','Fecha de nacimiento','E-mail','Celular','País','Ciudad','Evento','Tipo de actividad']
            titles.forEach((title,index) => {
                ws.cell(2, index + 1)
                .string(title)
                .style(style)
                .style({
                    font:{
                        bold: true,
                    }
                });
            })
            let contador = 1;
            records.forEach((record,index) => {
                index = index + 3
                ws.cell(index,1)
                .number(contador)
                .style(style)

                ws.cell(index,2)
                .string(record.name)
                .style(style)
                
                ws.cell(index,3)
                .string(record.surname)
                .style(style)

                ws.cell(index,4)
                .string(record.genre)
                .style(style)

                ws.cell(index,5)
                .string(moment.parseZone(record.birthday).local().format('DD/MM/YYYY'))
                .style(style)

                ws.cell(index,6)
                .string(record.email)
                .style(style)

                ws.cell(index,7)
                .string(record.phone)
                .style(style)

                ws.cell(index,8)
                .string(record.country)
                .style(style)

                ws.cell(index,9)
                .string(record.city)
                .style(style)

                ws.cell(index,10)
                .string(record.event.name)
                .style(style)

                ws.cell(index,11)
                .string(record.event.activity.name)
                .style(style)

                contador++
             })
            
            var fileName = `Inscriptos_al_${moment.parseZone(new Date()).local().format('DD-MM-YYYY')}.xlsx`;
            
            wb.write(`downloads/${fileName}`);
            setTimeout(() => {
                return res.redirect('/records/download?file=' + fileName)

            }, 1000);

            
        }).catch(error => console.log(error))
    }
};
