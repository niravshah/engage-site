module.exports = function (app) {
    var Project = require('../../models/project');
    app.get('/api/projects/available', function (req, res) {
        Project.find({ status: "new" }, function (err, projects) {
            if (err) {
                res.json({ success: false, message: "Error getting projects" + err.message });
            } else {
                res.json(projects);
            }
        })
    });
};