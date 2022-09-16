const express = require('express');
const connection = require('../connection');
const router = express.Router();

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();
var auth = require('../services/auth');
var checkRole = require('../services/checkRole');
const { request, response } = require('express');
// const { query } = require('express');



//New signup request for travel website
router.post ('/signup', (request, response, next) => {
    var user = request.body;
    query = 'select email, password, role from users where email = ?'
    connection.query(query, [user.email], (error, result) => {
        if(!error) {
            if(result.length <= 0) {
                query = "insert into users (username, phone, email, password, role) values (?, ?, ?, ?, 'USER')";
                connection.query(query, [user.username, user.phone, user.email, user.password], (error, result) => {
                    if (!error) {
                        return response.status(200).json({
                            message: 'User Created Successfully !',
                            success: true,
                        })
                    }
                    else {
                        return response.status(500).json({
                            message: 'Error while creating the profile',
                            success: false
                        })
                    }
                })
            } 
            else {
                return response.status(500).json({
                    message: 'Email already taken !'
                })
            }
        } 
        else {
            return response.status(500).json(error)
        }
    })
})


//New login request for travel webite
router.post ('/login', (request, response, next) => {
    var user = request.body;
    query = "select email, password, role from users where email = ?"
    connection.query(query, [user.email], (error, result) => {
        if (!error) {
            if (result.length <= 0 || result[0].password != user.password) {
                return response.status(401).json({
                    message: 'Invalid Credentials !'
                })
            }
            else if (result[0].password == user.password ) {
                const res = { email: result[0].email, role: result[0].role}
                const accessToken =  jwt.sign(res, process.env.ACCESS_TOKEN, {expiresIn: '8h'})
                return response.status(200).json({
                    message: 'Login Success',
                    success: true,
                    token: accessToken
                })
            } else {
                return response.status(400).json({
                    message: 'Please try again !'
                })
            }
        }
        else {
            return response.status(500).json(error)
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

//Forget password for travel website
router.post('/forget-password', (request, response, next) => {
    var user = request.body;
    query = "select email, password from users where email = ?";
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
                    subject: 'Password sent successfully !',
                    html: '<p><b>Your login credentials: </b><br><b>Email - </b>'+result[0].email+'<br><b>Password - </b>'+result[0].password+'</p>'
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
                    console.log('INOF -----------------------', info);
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


//Authentication from token
router.get('/check-token', (request, response, next) => {
    return response.status(200).json({
        message: '- VALID TOKEN -'
    })
})


//To get all the palces for travel website
router.get('/best-of-india', (request, response, next) => {
    var query = "select id, place, image, description from bestofindia";
    connection.query(query, (error, result) => {
        if (!error) {
            return response.status(200).json({
                message: 'Places fetched successfully !',
                success: true,
                result: result
            })
        }
        else {
            return response.status(500).json(error)
        }
    })
})


//Get all users
router.get('/get', (req, res) => {
    var query =  "select id, name, contactNumber, email from users where role = 'user'";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    })
})


//Update password
// router.post('/changePassword', auth.authToken, (req, res) => {
//     const user = req.body;
//     const email = res.locals.email;
//     console.log('Email-->',email);
//     query = "select * from user where email = ? and password = ?";
//     connection.query(query, [email, user.oldPassword], (err, results) => {
//         if (!err) {
//             if (results.length <= 0) {
//                 return res.status(400).json({
//                     message: 'Old password is incorrect'
//                 }); 
//             } else if  (results[0].password == user.oldPassword) {
//                 query = "update user set password = ? where email = ?"
//                 connection.query(query, [user.newPassword, email], (err, results) => {
//                     if (!err) {
//                         return res.status(200).json({
//                             message: 'Password updated successfully'
//                         });
//                     } else {
//                         return res.status(500).json(err);
//                     }
//                 });
//             } else {
//                 return res.status(400).json({
//                     message: 'Something went wrong! Try again later.'
//                 });
//             }
//         } else {
//             return res.status(500).json(err);
//         }
//     })
// })

module.exports = router;