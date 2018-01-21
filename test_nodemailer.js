/**
 * Created by jmartinez on 12/17/17.
 */
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
        user: "support@drcog.org",
        pass: "FortyDegrees!"
    }
});

transporter.verify(function(error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take our messages');
    }
});