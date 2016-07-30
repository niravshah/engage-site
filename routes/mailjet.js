var express = require('express');
var router = express.Router();
var path = require('path');

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://5181531eca7071901ce351edc1afa862:42b3f9777319e18107bc643e6b241e3d@in-v3.mailjet.com');

var EmailTemplate = require('email-templates').EmailTemplate;
var templateDir = path.join(__dirname, 'templates', 'notify');
var notify = new EmailTemplate(templateDir);

var mailjet = module.exports = {
    sendRegistrationEmail: function(user) {
        notify.render(user, function(err, result) {
            if(!err) {
                transporter.sendMail({
                    from: 'hello@engagewithin.com',
                    to: user.uname,
                    subject: 'Welcome to Engage',
                    html: result.html,
                    text: result.text
                },function(err,resp){
                    if(err){
                        console.log('Mailjet Error',err);
                        
                    }else{
                        console.log('Mailjet Response',resp)
                    }
                });
            }else{
                console.log('Mailjet Erro', err, user)
            }
        });
    }
};