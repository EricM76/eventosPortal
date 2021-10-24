const db = require('../database/models');
const path = require('path');
const fs = require('fs');
const moment = require('moment');
const {SMTPClient, Message} = require('emailjs');
const xl = require('excel4node');

const client = new SMTPClient({
	user: 'idudalia@gmail.com',
	password: 'idudalia2021',
	host: 'smtp.gmail.com',
	ssl: true,
});

/* const codigos = require('../data/paises.json');
const paises = [];
for (const key in codigos) {
    paises.push(codigos[key])
} */

const { validationResult } = require('express-validator');

module.exports = {
    register : (req,res) => {
        let event = db.Event.findOne({
            where : {
                id : req.params.id
            },
            include : [
                {association : 'logos' }
            ]
        })
        let countries = db.Country.findAll()
        Promise.all([event,countries])
        .then(([event,countries]) => {
            return res.render('form',{
                event,
                countries,
                title : event.title,
                moment
            })
        })
        .catch(error => console.log(error))
    },
    processRegister : (req,res) => {
        let errors = validationResult(req);
        const {name,surname,genre,birthday,email,prefix,phone,country,state,city} = req.body;
        const fecha = new Date(birthday);

        if(errors.isEmpty()){
        db.Record.create({
            name,
            surname,
            genre,
            birthday: fecha.setDate(fecha.getDate() + 1),
            email,
            phone: prefix === '+54' ? prefix + '9-' + phone : prefix + '-' + phone,
            country,
            state,
            city,
            eventId : req.params.id
        })
        .then(record => {
            db.Event.findByPk(req.params.id)
            .then(event => {
                let date = new Date(event.date)
                date.setDate(date.getDate() + 1)
                date = date.toLocaleDateString('es-AR')
                
                if(event.modality === "virtual"){
                    var message = new Message({
                        text: `Gracias por registrate en el evento "${event.name.trim()}"\na realizarse el día ${moment.parseZone(event.date).local().format('DD/MM/YYYY')} a las ${moment.parseZone(event.date).local().format('HH')}hs\npor la plataforma ${event.plataform.trim()}. Link de conexión: ${event.connection.trim()}.\n\nTe esperamos!`,
                        from: 'urbaneventsportaleric@gmail.com',
                        to: record.email,
                        cc: ' ',
                        subject: event.name,
                    });
                }else if(event.modality === "presencial"){
                    var message = new Message({
                        text: `Gracias por registrate en el evento "${event.name.trim()}"\na realizarse el día ${moment.parseZone(event.date).local().format('DD/MM/YYYY')} a las ${moment.parseZone(event.date).local().format('HH')}hs\nen ${event.location.trim()}.\n\nTe esperamos!`,
                        from: 'urbaneventsportaleric@gmail.com',
                        to: record.email,
                        cc: ' ',
                        subject: event.name,
                    });
                }
               
                client.send(message, (err, message) => {
                    console.log(err || message);
                });
                return res.render('success',{
                    record,
                    event,
                    date,
                    title: "Inscripción exitosa"
                })
            })
        })
        .catch(error => console.log(error))
    }else{
        db.Event.findOne({
            where : {
                id : req.params.id
            },
            include : [
                {association : 'logos' }
            ]
        })
        .then(event => {
            return res.render('form',{
                event,
                paises: paises.sort(),
                title : event.title,
                errores : errors.mapped(),
                old : req.body
            })
        })
        .catch(error => console.log(error))
    }
    },
    list : (req,res) => {

    },
    remove : (req,res) => {

    },
    createExcel : (req,res) => {
        db.Event.findOne({
            where : {
                id : req.params.id
            },
            include : [
                {association : 'records'},
                {association: 'activity'}
            ]
        }).then(event => {

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
            .string(event.name.toUpperCase())
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
            ws.column(7).setWidth(20);
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
            let count = 1;
            event.records.forEach((record,index) => {
                index = index + 3
                ws.cell(index,1)
                .number(count)
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
                .string(event.name)
                .style(style)

                ws.cell(index,11)
                .string(event.activity.name)
                .style(style)

                count++
             })

            var name = event.activity.name.replace(" ","_")
            
            var fileName = `${name}_${moment.parseZone(event.date).local().format('DD-MM-YYYY')}.xlsx`;
            
            wb.write(`downloads/${fileName}`);
            setTimeout(() => {
                return res.redirect('/records/download?file=' + fileName)

            }, 2000);

            
        }).catch(error => console.log(error))

    },
    download : (req,res) => {
        res.download(path.join(__dirname,'..','downloads',req.query.file))
    },
    preview : (req,res) => {
        return res.render('admin/form-preview',{
            title : "Vista previa"
        })
    },
    success : (req,res) => {
        db.Event.findByPk(2)
        .then(event => {
            return res.render('success',{
                title : "Inscripción exitosa",
                event
            })
        })
        
    }
}