var config = [];

config['dev'] = {
    mongoUrl: 'mongodb://localhost/engagesite',
};

config['int'] = {
    mongoUrl: 'mongodb://mongo/engagesite',
};

module.exports = config;