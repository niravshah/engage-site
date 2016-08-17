
module.exports = {
    before:function(){
        require('../engageapp').listen(3000);
    },
    'Engage Homepage Test' : function (browser) {
        browser
            .url('http://localhost:3000')
            .waitForElementVisible('body', 1000)
            .assert.containsText('.big-title', 'EMPLOYEE ENGAGEMENT')
            .end();
    },
    after : function() {
        process.exit();
    }
};