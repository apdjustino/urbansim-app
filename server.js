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

app.post('/api/login', (req, res, next) => {
    const email = req.body.email;
    User.findOne({email: email}, (err, user) => {
        if(user){
            bcrypt.compare(req.body.password, user.password, function(error, isMatch){
                if(error){
                    console.log(error);
                    res.json({success: false});
                }else{
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

app.post('/api/passwordreset', (req, res, next) => {
    const email = req.body.email;
    User.findOne({email: email}, (err, user) => {
        if(user){
            const token = jwt.sign({email: email}, secrets.jwt_secret);
            res.json({success: true, token: token}); //replace this with smtp email with token in link.
        }else{
            res.json({success: false, statusText: "Email address not found."})
        }
    })
});

//main server listening loop
app.listen(3000, function(){
    console.log("Urbansim listening on port 3000")
});