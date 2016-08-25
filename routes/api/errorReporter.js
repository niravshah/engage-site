module.exports = function (app) {
    var uiError = require('../../models/uierror');
    app.post('/api/error', function (req, res) {
        var uE = new uiError({
            reason: req.body.exception.message,
            exception: req.body.exception.reason,
            date: new Date()
        });
        uE.save(function (error) {
            if (error) {
                console.log(error);
            }
            res.json({ message: "Error Reported" })
        });

    });

}