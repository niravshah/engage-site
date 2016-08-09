var env = process.env.NODE_ENV || 'dev';
var config = require('../config')[env];

var path = require('path');
var sgTransport = require('nodemailer-sendgrid-transport');
var nodemailer = require('nodemailer');

var MAILJET_USERNAME = config.mailjet_user;
var MAILJET_PASSWORD = config.mailjet_password;
var MAILJET_SERVER = config.mailjet_server;
var SENDGRID_APIKEY = config.sendgridkey;

//var transporter = nodemailer.createTransport('smtps://' +  MAILJET_USERNAME +':' + MAILJET_PASSWORD +'@' + MAILJET_SERVER);
var transporter = nodemailer.createTransport(sgTransport({auth:{api_key:SENDGRID_APIKEY}}));

var EmailTemplate = require('email-templates').EmailTemplate;

var onboardTemplateDir = path.join(__dirname, 'templates', 'onboard');
var onboardTemplate = new EmailTemplate(onboardTemplateDir);

var welcomeTemplateDir = path.join(__dirname, 'templates', 'welcome');
var welcomeTemplate = new EmailTemplate(welcomeTemplateDir);

var mailjet = module.exports = {
    newContact: function (newContact, cb) {
        transporter.sendMail({
            from: 'hello@engagewithin.com',
            to: 'nirav.shah83@gmail.com',
            subject: 'New Contact - Engage Within',
            text: newContact
        }, function (err, resp) {
            if (err) {
                console.log('Mailjet Error', err);
                cb(err, null);
            } else {
                console.log('Mailjet Response', resp);
                cb(null, err);
            }
        });
    },
    sendRegistrationEmail: function (user) {
        if (config.emailsEnabled == true) {
            user.homelink = "http://engagewithin.com/ngo/" + user.orgId;
            var locals = { user: user };
            welcomeTemplate.render(locals, function (err, result) {
                if (!err) {
                    transporter.sendMail({
                        from: 'hello@engagewithin.com',
                        to: user.uname,
                        subject: 'Welcome to Engage',
                        html: result.html,
                        text: result.text
                    }, function (err, resp) {
                        if (err) {
                            console.log('Mailjet Error', err);

                        } else {
                            console.log('Mailjet Response', resp)
                        }
                    });
                } else {
                    console.log('Mailjet Erro', err, user)
                }
            });
        }
    },
    sendOnboardEmail: function (user) {
        if (config.emailsEnabled == true) {
            var locals = { user: user };
            onboardTemplate.render(locals, function (err, result) {
                if (!err) {
                    transporter.sendMail({
                        from: 'hello@engagewithin.com',
                        to: user.uname,
                        subject: 'Welcome to Engage',
                        html: result.html,
                        text: result.text
                    }, function (err, resp) {
                        if (err) {
                            console.log('Mailjet Error', err);

                        } else {
                            console.log('Mailjet Response', resp)
                        }
                    });
                } else {
                    console.log('Mailjet Erro', err, user)
                }
            });
        }
    }
};