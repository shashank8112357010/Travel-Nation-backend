const { response, request } = require('express');
const express = require('express');
const connection = require('../connection');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

//Post enquiry for user
router.post('/send', (request, response, next) => {
    let data = request.body;
    var query = "insert into enquiry(name, email, phone, date, no_of_people, message) values(?, ?, ?, ?, ?, ?)";
    connection.query(query, [data.name, data.email, data.phone, data.date, data.no_of_people, data.message], (error, result) => {
        if (! error) {
            return response.status(200).json({
                message: 'Enquiry sent successfully !',
                success: true,
            })
        }
        else {
            return response.status(500).json({
                message: 'Please try again !',
                success: false
            })
        }
    })
});

//Get all enquiries for admin
router.get('/view', (request, response, next) => {
    var query = "select id, name, email, phone, date, no_of_people, message from enquiry";
    connection.query(query, (error, result) => {
        if (!error) {
            return response.status(200).json({
                message: 'Enquiries fetched successfully !',
                success: true,
                result: result,
            })
        }
        else {
            return response.status(500).json(error)
        }
    })
})

//Delete enquiry for admin
router.delete('/delete/:id', (request, response, next) => {
    const id = request.params.id;
    var query = "delete from enquiry where id = ?";
    connection.query(query, [id], (error, result) => {
        if (!error) {
            if (result.affectedRows == 0) {
                return response.status(404).json({
                    message: "Enquiry not found !",
                    success: false
                })
            }
            return response.status(200).json({
                message: "Enquiry deleted successfully !",
                success: true
            })
        } else {
            return response.status(500).json(error);
        }
    })
})


//Mailinator Email Verification
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
        type: 'login'
    },
});


router.post('/send-mail', (request, response, next) => {
    var user = request.body;
    query = "select name, email from enquiry where email = ?";
    connection.query(query, [user.email], (error, result) => {
        if (!error) {
            if (result.length <= 0) {
                return response.status(403).json({
                    message: 'Email address does not exist !'
                })
            }
            else {
                var mailOptions = {
                    from: process.env.EMAIL,
                    to: result[0].email,
                    subject: 'Thanks for reaching out to us',
                    html: '<p><b>Hi,'+result[0].name+'</b></p><br><p>We have received your enquiry.</p><br><p>Someone from our team will get back to you.</p>'



                    //  html: '<p><b>Your login credentials: </b><br><b>Email - </b>'+result[0].email+'<br><b>Password - </b>'+result[0].password+'</p>'
                };
                console.log('MAILING OPTIONS -----------------------', mailOptions);

                transporter.verify(function (error, success) {
                    if (error) {
                      console.log("error",error);
                    } else {
                      console.log("Server is ready to take our messages");
                    }
                  });

                transporter.sendMail(mailOptions, function(err, info) {
                    if(err) {
                        console.log('ERROR -------------------', err);
                    }
                    else {
                        console.log('Email Sent -------------------', info.response);
                    }
                    console.log('Info -----------------------', info);
                });
                return response.status(200).json({
                    message: 'SENT',
                    success: true
                })
            }
        }
        else {
            return response.status(500).json(error)
        }
    })
})




module.exports = router;