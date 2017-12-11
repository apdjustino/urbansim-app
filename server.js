/**
 * Created by jmartinez on 12/11/17.
 */
import express from 'express'
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt-nodejs';
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

//main server listening loop
app.listen(3000, function(){
    console.log("Urbansim listening on port 3000")
});