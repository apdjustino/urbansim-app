/**
 * Created by jmartinez on 12/11/17.
 */
import express from 'express'
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt-nodejs';
import User from './src/server/user';
import secrets from './src/server/secrets';
import nodemailer from 'nodemailer';


//create and configure the express server

const app = express();
app.use(bodyParser.json());

//configuration for create-react-app
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


//connect to credential mongo server

const connect = () => {
    mongoose.connect(secrets.db, (err, res) => {
        if(err){
            console.log(`Error connecting to ${secrets.db}. ${err}`)
        } else {
            console.log(`Successfully connected to ${secrets.db}.`)
        }

    })
};

connect();
mongoose.connection.on("error", console.error);
mongoose.connection.on("disconnected", connect);


//api routes (client side routes are handled in react component App.js
app.post('/api/register', (req, res, next) => {
    //is email already in use?
    User.findOne({email: req.body.email}, (err, user) => {
        if(user){
            res.json({success: false, statusText: "Email already in use"});
        }else{
            //create a new user
            User.create(req.body, (err) => {
                if (err) {
                    console.error(err);
                    res.json({ success: false});
                }
                const token = jwt.sign({email: req.body.email}, secrets.jwt_secret);
                const transporter = nodemailer.createTransport({
                    host: "smtp.office365.com",
                    port: 587,
                    secure: false,
                    auth: {
                        user: secrets.smtp_username,
                        pass: secrets.smtp_password
                    }
                });

                const message = {
                    from: "support@drcog.org",
                    to: req.body.email,
                    subject: "DRCOG UrbanSim Account Created.",
                    text: `You have been invited to use DRCOG UrbanSim at this email address.. Click the following link to set your password: http://${secrets.base_url}/reset-password/${token}`
                };

                transporter.sendMail(message, function(err, info){
                    if(err){
                        console.log(err);
                        res.json({success:false})
                    }else{
                        res.json({success:true})
                    }
                });
                
                // res.json({ success: true, email: req.body.email });
            });
        }
    });
});


app.post('/api/login', (req, res, next) => {
    const email = req.body.email;
    User.findOne({email: email}, (err, user) => {
        if(user){
            bcrypt.compare(req.body.password, user.password, function(error, isMatch){
                if(error){
                    console.log(error);
                    res.json({success: false});
                }else{
                    console.log(user.password);
                    if(isMatch){
                        const token = jwt.sign({email: email}, secrets.jwt_secret);
                        res.json({success: true, token: token});
                    }else{
                        res.json({success: false});
                    }

                }
            });
        }else{
            res.json({success: false});
        }
    })
});

app.post('/api/authenticate', (req, res, next) => {
    const token = req.body.token;
    jwt.verify(token, secrets.jwt_secret, (err, decoded) => {
        if(err){
            res.json({authenticated: false});
        }else{
            res.json({authenticated: true})
        }
    })
});

app.post('/api/passwordrequest', (req, res, next) => {
    const email = req.body.email;
    User.findOne({email: email}, (err, user) => {
        if(user){
            const token = jwt.sign({email: email}, secrets.jwt_secret);
            const transporter = nodemailer.createTransport({
                host: "smtp.office365.com",
                port: 587,
                secure: false,
                auth: {
                    user: secrets.smtp_username,
                    pass: secrets.smtp_password
                }
            });

            const message = {
                from: "support@drcog.org",
                to: email,
                subject: "DRCOG UrbanSim Password Reset",
                text: `You have recently requested a password reset DRCOG UrbanSim. Click the following link to reset your password: http://${secrets.base_url}/reset-password/${token}`
            };

            transporter.sendMail(message, function(err, info){
                if(err){
                    console.log(err);
                }else{
                    res.json({success:true})
                }
            });

            // res.json({success: true, token: token}); //replace this with smtp email with token in link.
        }else{
            res.json({success: false, statusText: "Email address not found."})
        }
    })
});

app.post('/api/passwordreset', (req, res, next) => {
    const token = req.body.token;
    jwt.verify(token, secrets.jwt_secret, (err, decoded) => {
        if(err){
            res.json({success: false, reason: "Invalid token."})
        }else{
            bcrypt.genSalt(5, function(err, salt){
                if(err) return next(err);
                bcrypt.hash(req.body.password, salt, null, function(error, hash){
                    if(error) return next(error);
                    User.update({email: decoded.email}, {$set:{password: hash}}, (error, count) =>{
                        console.log(count);
                    })
                });
            });
            

        }
    })
});

//main server listening loop
app.listen(3000, function(){
    console.log("Urbansim listening on port 3000")
});