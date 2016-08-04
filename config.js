var config = [];

config['dev'] = {
    mongoUrl: 'mongodb://localhost/engagesite',
    superSecret: "scoobydoobydoo",
    emailsEnabled: false
};

config['int'] = {
    mongoUrl: 'mongodb://mongo/engagesite',
    superSecret: "scoobydoobydoo",
    emailsEnabled: true
};

module.exports = config;