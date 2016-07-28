var config = [];

config['dev'] = {
    mongoUrl: 'mongodb://localhost/engagesite',
    superSecret: "scoobydoobydoo"
};

config['int'] = {
    mongoUrl: 'mongodb://mongo/engagesite',
    superSecret: "scoobydoobydoo"
};

module.exports = config;