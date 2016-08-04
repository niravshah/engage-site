app.factory('DataService', function () {

    var currentNgo = {};
    var currentTeamMember = {};
    var currentProject = {};

    return {
        init: function () {
            currentNgo.projects = [];
            currentNgo.teamMembers = [];
            currentTeamMember.createEngageUser = true;
            currentProject.eDate = new Date();
            currentProject.sDate = new Date();
        },
        setCurrentNgo: function (ngo) {
            currentNgo = ngo;
        },

        getCurrentNgo: function () {
            return currentNgo;
        },
        getCurrentNgoId: function () {
            return currentNgo._id;
        },
        getCurrentNgoTeamMembers: function () {
            return currentNgo.teamMembers;
        },
        getCurrentNgoProjects: function () {
            return currentNgo.projects;
        },
        addCurrentNgoTeamMember: function (tM) {
            currentNgo.teamMembers.push(tM);
        },
        addCurrentNgoProject: function (tM) {
            currentNgo.projects.push(tM);
        },
        getCurrentTeamMember: function () {
            return currentTeamMember;
        },
        setCurrentTeamMember: function (tM) {
            currentTeamMember = tM;
        },
        getCurrentProject: function () {
            return currentProject;
        },
        setCurrentProject: function (tM) {
            currentProject = tM;
        }
    }
});