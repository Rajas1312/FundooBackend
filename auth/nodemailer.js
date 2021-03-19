const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const ejs = require('ejs')
const fs = require('fs')
dotenv.config();

exports.sendEmail = (result) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: result.email,
            pass: process.env.PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    ejs.renderFile('app/views/view.ejs', 'utf8', (err, data) => {
        if (err) {
            console.log('error', err)
        } else {
            let mailOptions = {
                from: result.email,
                to: 'itsmerajas2@gmail.com',
                subject: 'Sending Email using Node.js',
                html: `${data}<p1> ${'http://localhost:3000/resetPassword'}/${result.token}</p1>`

            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
    })
}