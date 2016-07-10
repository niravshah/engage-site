var Mailjet = require('node-mailjet').connect('5181531eca7071901ce351edc1afa862', '42b3f9777319e18107bc643e6b241e3d');
var sendEmail = Mailjet.post('send');

var express = require('express');
var router = express.Router();


router.post('/mailjet', function(req, res) {


    var emailData = {
        'FromEmail': 'newcontact@movewithin.org',
        'FromName': 'New Contact',
        'Subject': 'New Engage Demo Request: ' + req.body.contactname,
        'Text-part': JSON.stringify(req.body),
        'Recipients': [{'Email': 'nirav.shah83@gmail.com'}]
    }

    sendEmail
        .request(emailData)
        .then(function(data){
            res.status(200).send(data.response.text);
        })
        .catch(function(error){
            console.log(error);
            res.status(500).send(error);
        });


});

module.exports = router;


