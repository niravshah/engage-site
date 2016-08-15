var express = require('express');
var router = express.Router();
var Ngo = require('../models/ngo');

var content = {};
content['en'] = {
    "s1_1": "Join Engage",
    "s1_2": "Let us help you change the world.",
    "s2_1":"How it Works?",
    "s2_2":"At Engage, we want to make it easy for some of today's leading corporate organizations to",
    "s2_3":"works with successful NGOs, to create a positive impact. We believe through these partnerships, we can together, ",
    "s2_4":"forge a strong culture of giving back to local communities and wider society.",
    "s3_1":"Create A Profile",
    "s3_2":"Your profile tells corporates and companies more about your organization and the impact you have on your community. A good profile is a sure shot way to attract and engage more companies to further your cause.",
    "s3_3":"We've made this task extremely easy for you through our special on-boarding process. Register above to get access.",
    "s3_4":"",
    "s4_1":"List Your Team",
    "s4_2":"Adding your team members and their roles and responsibilities makes it easier for prospective partners to connect with you.",
    "s4_3":"Make sure you list the key members of your team on your profile. Engage makes sure we never publicly disclose any emails or contact details for any of your team members.",
    "s5_1":"List Projects",
    "s5_2":"Besides helping NGOs connect successful corporate organization, another key goal of engage is to help corporate engage employee and develop their professional skills. We feel working with NGOs on community projects is an excellent way to achieve this.",
    "s5_3":"You can list the initiatives you need corporate help and support under the projects section of your profile.",
    "s5_4":"Besides listing how these initiatives impact the local community, make sure you articulate how getting involved in these initiatives can help volunteers develop their professional and inter-personal skills.",
};
content['ro'] = {
    "s1_1": "Join Engage",
    "s1_2": "Let us help you change the world.",
    "s2_1":"Cum Functioneaza ?",
    "s2_2":"Engage a fost conceput din dorinta de facilita o mai buna colaborare intre firme si ONG uri si ",
    "s2_3":"pentru a oferi o platforma cu beneficii reale pentru ambele parti.",
    "s2_4":"Credem ca in acest mod putem contribuii la instalarea unei culturi de voluntariat mult mai puternica, atat in interiorul companiilor cat si in Romania.",
    "s3_1":"Creeaza Profil",
    "s3_2":"Profilul tau este oglinda organizatiei!",
    "s3_3":"Crearea unui profil pe engage te va ajuta sa recrutezi voluntari si parteneri din mediul corporate si iti va oferi expunere in fata a sute de organizatii in cautare de proiecte umanitare.",
    "s3_4":"Vrem sa oferim transparenta totala, drept urmare un profil detaliat si complet te va ajuta sa obtii mai multe vizualizari si iti vor inbunatati sansele ca o firma sa se implice in proiectul tau sau sa iti ofere sustinere.",
    "s4_1":"Listeaza Echipa",
    "s4_2":"Listeaza rolurile si responsabilitatile fiecarui membru din echipa ta.",
    "s4_3":"Acest lucru iti va oferi credibilitate si te va ajuta sa demonstrezi competenta si abilitatile echipei tale.",
    "s5_1":"Listeaza Proiectul",
    "s5_2":"Un alt rol important al acestei platforme este de a ajuta angajatii din companii sa isi inbunatateasca abilitatile, noi credem ca acest lucru poate fi facut prin implicarea angajatilor in cauze umanitare care sa le dezvolte abilitatile profesionale si interpersonale.",
    "s5_3":"Aceasta platforma va inlocui teambuildingul traditional cu o cultura puternica de voluntariat si va crea o relatie de tip win-win intre firme si ONGuri."
    "s5_4":"In timpul proiectului cat si la sfarsitul acestuia, voluntarii si ONGul pot folosi sistemul de management proiect si rating pentru a recunoaste candidatii care s-au remarcat in mod special.",
    "s5_5":"Fiecare proiect va fi postat atat in functie de abilitatile dezvoltate in voluntari cat si in functie de beneficiile pe care acesta le va oferi comunitatii.",

};

router.get('/ngo', function (req, res) {
    var host = '' + req.get('host');
    if (host.indexOf('ro') > -1) {
        res.render('ngo/join', content['ro']);
    } else {
        res.render('ngo/join', content['en']);
    }
});

router.get('/ngo/admin',function (req,res){
   res.render('ngo/admin');
});

router.get('/ngo/:id', function (req, res, next) {
    Ngo.findOne({sname: req.params.id}, function (err, ngo) {
        if (err) {
            res.status(500).json({'Error': err});
        }
        else if (ngo) {
            console.log(ngo);
            res.render('ngo/landing', ngo);
        } else {
            next();
        }
    });

});
router.get('/ngo/:id/:pid', function (req, res, next) {
    Ngo.findOne({sname: req.params.id}, function (err, ngo) {
        if (err) {
            res.status(500).json({'Error': err});
        }
        else if (ngo) {

            var currentProject;
            for(var i=0;i<ngo.projects.length;i++){
                if(ngo.projects[i].id == req.params.pid){
                    currentProject = ngo.projects[i];
                }
            }

            ngo.project = currentProject;
            res.render('ngo/project', ngo);
        } else {
            next();
        }
    });

});

module.exports = router;