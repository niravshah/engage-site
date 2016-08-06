var config = [];

config['dev'] = {
    mongoUrl: 'mongodb://localhost/engagesite',
    superSecret: "scoobydoobydoo",
    emailsEnabled: false,
    fileStorage:'local'
};

config['live'] = {
    mongoUrl: 'mongodb://localhost/engagesite',
    superSecret: "scoobydoobydoo",
    emailsEnabled: true,
    fileStorage:'s3'
};

module.exports = config;