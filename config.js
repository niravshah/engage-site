var config = [];

config['dev'] = {
    mongoUrl: 'mongodb://localhost/engagesite',
    superSecret: "scoobydoobydoo",
    emailsEnabled: false,
    fileStorage:'local',
    mailjet_user:'5181531eca7071901ce351edc1afa862',
    mailjet_password:'ce9fcb65e84d8b1593d4489805be2ffd',
    mailjet_server:'in-v3.mailjet.com'
};

config['live'] = {
    mongoUrl: 'mongodb://localhost/engagesite',
    superSecret: "scoobydoobydoo",
    fileStorage:'s3',
    emailsEnabled: true,
    mailjet_user:'5181531eca7071901ce351edc1afa862',
    mailjet_password:'ce9fcb65e84d8b1593d4489805be2ffd',
    mailjet_server:'in-v3.mailjet.com'
};

module.exports = config;