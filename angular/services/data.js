app.service('DataService', function () {

    var currentNgo = {};
    var currentTeamMember = {};
    var currentProject = {};

    this.init = function(){
        currentNgo.projects = [];
        currentNgo.teamMembers = [];
        currentTeamMember.createEngageUser = true;
        currentProject.eDate = new Date();
        currentProject.sDate = new Date();
    };
    this.setCurrentNgo = function(ngo){
        currentNgo = ngo;
    };
    this.getCurrentNgo = function(){
        return currentNgo;
    };
    this.getCurrentNgoId = function(){
      return currentNgo._id;
    };
    this.getCurrentNgoTeamMembers = function(){
        return currentNgo.teamMembers;
    };
    this.getCurrentNgoProjects = function(){
        return currentNgo.projects;
    };
    this.addCurrentNgoTeamMember = function(tM){
      currentNgo.teamMembers.push(tM);
    };
    this.addCurrentNgoProject = function(tM){
        currentNgo.projects.push(tM);
    };
    this.getCurrentTeamMember = function(){
        return currentTeamMember;
    };
    this.setCurrentTeamMember = function(tM){
        currentTeamMember = tM;
    };
    this.getCurrentProject = function(){
        return currentProject;
    };
    this.setCurrentProject = function(tM){
        currentProject = tM;
    };
});