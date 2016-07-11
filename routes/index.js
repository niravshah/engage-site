var express = require('express');
var router = express.Router();

var content = {};

content['en'] = {
    s1_1: 'EMPLOYEE ENGAGEMENT',
    s1_2: 'THROUGH MANAGED CSR',
    s2_1: 'Develop employees by grooming key professional skills & personal strengths.',
    s2_2: 'Give back to your local community through managed CSR Projects.',
    s2_3: 'Retain key talent by boosting employee attachment and pride in your organizations brand.',
    s3_1: 'Meet Engage',
    s3_2: 'Our platform for Employee Development through managed Community Service Projects.',
    s3_3: 'Engage lets you highlight and develop key professional skills in your employees through participation and delivery of community service projects.',
    s3_4: 'We work with NGOs to structure and define projects that can help participants develop skills like leadership, communication, project management and resilience.',
    s3_5: 'Employees can than use our highly interactive platform to manage and deliver these projects with management and HR oversight. We provide you detailed insights and reporting on how youremployees are performing at each step of the project.',
    s3_6: 'Request Demo',
    s4_1: 'Simple',
    s4_2: 'Engage is extremely simple & intuitive to use. You or your employees will not need any special training to plan and manage your CSR initiatives.',
    s4_3: 'Interactive',
    s4_4: 'One of our key aim is to boost collaboration and team work. Our interactive always live project boards make communication fun and easy.',
    s4_5: 'Integrated',
    s4_6: 'Engage can integrate with your existing HR systems. You can easily import and export existing data into the platform through our powerful data tools.',
    s4_7: 'Plan',
    s4_8: 'Engage has been purposefully designed to make planning and scheduling of project tasks easy and interactive. Milestones allow participants ',
    s4_9: 'Manage',
    s4_10: 'Live status reporting and task assignments offer participants an intuitive and effective way to manage and communicate progress on their projects.',
    s4_11: 'Report',
    s4_12: 'Our powerful reporting tools allow you to visualise and discover hidden gaps and strengths in your current talent pool.',
    s5_1: 'Employee Development',
    s5_2: 'Grow your employees through professional skill development.',
    s5_3: 'Planning, managing and delivering community service projects requires a combination of leadership, project management, communication, resilience and team work skills.',
    s5_4: 'We work very closely with all participating NGOs to define projects that require a good combination of these key professional skills. Hence Engage offers an excellent platform for participants to develop skills that help them advance in their career and add more value to your organization.'
};

content['ro'] = {
    s1_1: 'IMPLICAREA ANGAJAȚILOR',
    s1_2: 'THROUGH MANAGED CSR',
    s2_1: 'Develop employees by grooming key professional skills & personal strengths.',
    s2_2: 'Give back to your local community through managed CSR Projects.',
    s2_3: 'Retain key talent by boosting employee attachment and pride in your organizations brand.',
    s3_1: 'Meet Engage',
    s3_2: 'Our platform for Employee Development through managed Community Service Projects.',
    s3_3: 'Engage lets you highlight and develop key professional skills in your employees through participation and delivery of community service projects.',
    s3_4: 'We work with NGOs to structure and define projects that can help participants develop skills like leadership, communication, project management and resilience.',
    s3_5: 'Employees can than use our highly interactive platform to manage and deliver these projects with management and HR oversight. We provide you detailed insights and reporting on how youremployees are performing at each step of the project.',
    s3_6: 'Request Demo',
    s4_1: 'Simple',
    s4_2: 'Engage is extremely simple & intuitive to use. You or your employees will not need any special training to plan and manage your CSR initiatives.',
    s4_3: 'Interactive',
    s4_4: 'One of our key aim is to boost collaboration and team work. Our interactive always live project boards make communication fun and easy.',
    s4_5: 'Integrated',
    s4_6: 'Engage can integrate with your existing HR systems. You can easily import and export existing data into the platform through our powerful data tools.',
    s4_7: 'Plan',
    s4_8: 'Engage has been purposefully designed to make planning and scheduling of project tasks easy and interactive. Milestones allow participants ',
    s4_9: 'Manage',
    s4_10: 'Live status reporting and task assignments offer participants an intuitive and effective way to manage and communicate progress on their projects.',
    s4_11: 'Report',
    s4_12: 'Our powerful reporting tools allow you to visualise and discover hidden gaps and strengths in your current talent pool.',
    s5_1:   'Employee Development',
    s5_2: 'Grow your employees through professional skill development.',
    s5_3: 'Planning, managing and delivering community service projects requires a combination of leadership, project management, communication, resilience and team work skills.',
    s5_4: 'We work very closely with all participating NGOs to define projects that require a good combination of these key professional skills. Hence Engage offers an excellent platform for participants to develop skills that help them advance in their career and add more value to your organization.'
};

router.get('/', function (req, res) {
    res.redirect('/home')
});

router.get('/home', function (req, res) {
    var host = '' + req.get('host');
    if (host.indexOf('ro') > -1) {
        res.render('index', content['ro']);
    } else {
        res.render('index', content['en']);
    }

});


module.exports = router;
