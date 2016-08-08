var express = require('express');
var router = express.Router();
var mailjet = require('./mailjet');

var content = {};

content['en'] = {
    s1_1: 'EMPLOYEE ENGAGEMENT',
    s1_2: 'THROUGH MANAGED CSR PROJECTS',
    s2_1: 'Develop employees by grooming key professional skills & personal strengths.',
    s2_2: 'Give back to your local community through managed Community Service Projects.',
    s2_3: 'Retain key talent by boosting employee attachment and pride in your organizations brand.',
    s3_1: 'Meet Engage',
    s3_2: 'Our platform for Employee Development through managed Community Service Projects.',
    s3_3: 'Engage lets you highlight and develop key professional skills in your employees through participation and delivery of community service projects.',
    s3_4: 'We work with NGOs to structure and define projects that can help participants develop skills like leadership, communication, project management and resilience.',
    s3_5: 'Employees can than use our highly interactive platform to manage and deliver these projects with management and HR oversight. We provide you detailed insights and reporting on how your employees are performing at each step of the project.',
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
    s5_4: 'We work very closely with all participating NGOs to define projects that require a good combination of these key professional skills. Hence Engage offers an excellent platform for participants to develop skills that help them advance in their career and add more value to your organization.',
    s6_1: 'Giving Back',
    s6_2: 'Achieve your organizations sustainability goals by giving back to your local communities',
    s6_3:'Sustainability is a key 2016 objective for most business leaders. Community Service Projects and a robust CSR policy are the ideal mechanisms for brands to differentiate themselves as responsible corporate citizens and achieve their sustainability goals.',
    s6_4: 'By engaging and giving back to their local communities organizations can contribute to creating a healthier and producitve world leading to more engaged employees and higher customer confidence',
    s7_1:'Employee Retention',
    s7_2:'Boost retention by increasing employee pride in organization.',
    s7_3:'As the war for talent intensifies, a companys competitive advantage will be people who drive excellence in services and products to customers. Reatining and attracting high calibre talent and developing employee attachment to your corporate brand will become a vital objective. ',
    s7_4:'Such attachment can be developed, not through only attractive salaries, but by helping employees focus on the companys core values. Getting your employees involved in Community Service Projects not only helps grow their skills and talents but also helps develop a deep sense of pride and belonging towards your company culture.',
    s8_1:'Book Now',
    s8_2:'Send Request',
    s8_3:'Request A Demo',
    s8_4: 'Employees & Culture are extremely unique to each organization and change at various stages of organizations growth. We can work with you to define employee development objectives and CSR targets that are priority for your organization.',
    s8_5:'We can suggest NGOs and Projects that are most suitable to achieve your goals and how you can use the projects to achieve your employee and community engagement targets.',
    s8_6: 'Book your free consultation day today to explore how Engage can help you boost employee retention and develop a sense of pride and belonging amongst your employees towards your organization.'
    };

content['ro'] = {
    s1_1: 'ENGAGEMENT ANGAJATI',
    s1_2: 'PRIN SOFTWARE CSR',

    s2_1: 'Dezvolta si incurajeaza abilitatile echipelor tale.',
    s2_2: 'Implica-te in mod direct in proiectele umanitare din comunitatea ta.',
    s2_3: 'Creste rata de retentia a celor mai valorosi angajati ai tai dezvoltand sentimentul de apartenenta la organizatia ta',

    s3_1: 'Va prezentam ENGAGE',
    s3_2: 'Prima platforma pentru "engagement angajati prin CSR" din Romania.',
    s3_3: 'Engage va permite sa monitorizati si sa dezvoltati abilitatile si competentele cheie ale angajatilor prin implicarea acestora in proiecte umanitare.',
    s3_4: 'Lucram cu organizatii non profit pentru a structura si defini proiecte care vor ajuta angajatii tai sa dezvolte abilitati precum leadership, comunicare, management proiect, creativitate, flexibilitate .',
    s3_5: 'Angajatii vor folosi platforma noastra interactiva pentru a lucra sub indrumarea departamentului de HR si pentru a duce la bun sfarsit diferite proiecte.',
    s3_6: 'Cere un Demo',

    s4_1: 'Simplu de folosit',
    s4_2: 'Enagage este simplu de folosit si intuitiv, tu si angajatii tai nu veti avea nevoie de training pentru a va planifica initiativele si proiectele umanitare.',
    s4_3: 'Interactiv',
    s4_4: 'Unul dintre obiectivele noastre principale este sa inbunatatim colaborarea si munca in echipa, cu ajutorul bordurile de proiecte live am realizat exact acest lucru.',
    s4_5: 'Integrare',
    s4_6: 'Engage poate poate fi sincronizat cu sistemul de HR. Puteti face import/export de date deja existente in sistem.',
    s4_7: 'Plan',
    s4_8: 'Designul platformei a fost creat special pentru a face stabilirea de taskuri intr-un proiect cat mai usoara si interactiva ',
    s4_9: 'Administreaza',
    s4_10: 'Statusul pentru proiecte live ofera participantilor o modalitate usoara si intuitiva de a urmari si raporta progresul facut in timpul proiectelor.',
    s4_11: 'Raporturi',
    s4_12: 'Engage va permite sa generati rapoarte detaliate pentru a descoperi oamenii si departamentele care necesita mai multa atentie si imbunatatire.',

    s5_1: 'Dezvoltare angajati',
    s5_2: 'Ofera-le angajatilor tai oportunitatea de asi dezvolte noi abilitati.',
    s5_3: 'Planificarea si executarea unui proiect non profit necesita aceiasi combinatie de leadership, management si perseverenta ca in proiectele de zi cu zi .',
    s5_4: 'Lucram indeaproape cu toate ONG urile partenere pentru a identifica proiectele care necesita abilitatile cheie cerute de majoritatea angajatorilor.  Engage ofera o platforma excelenta pentru angajatii care urmaresc o crestere exponentiala a abilitatilor profesionale si o avansare rapida in cariera.',
    s6_1: 'O modalitate inovatoare de a da inapoi comunitatii tale',
    s6_2: 'Indeplineste-ti obiectivele de sustenabilitate ajutand comunitatea locala, ',
    s6_3: 'Sustenabilitatea reprezinta un obiectiv cheie pentru o mare parte a companiilor in urmatorii ani. O politica solida de CSR va contribuii la diferentierea firmelor pe piata si la o mai buna ideplinire a obiectivelor de sustenabilitate',
    s6_4: 'Ajutand si oferind suport comunitatilor locale companiile pot contribui la crearea unei mediu de lucru mai sanatos si mai productiv pentru angajatii lor imbunatatind in acelasi timp si nivelul de incredere pe care il au clientii in brandul lor ',
    s7_1:'Retentie angajati',
    s7_2:'Inbunatateste rata de retentie a angajatilor.',
    s7_3:'Pentru orice companie care lucreaza într-un mediu puternic concurential, atasamentul fata de brand al angajatilor este esential',
    s7_4:'Atasamentul nu se obtine doar prin salarii atractive. Din ce în ce mai multi angajati resimt nevoia de a fi mandri de compania la care lucreaza, acest sentiment poate fi cultivat prin implicarea lor in programe umanitare si integrarea de noi practici umanitare si de voluntariat in cultura companiei',

    s8_1:'Programeaza un demo',
    s8_2:'Trimite',
    s8_3:'Cereti un demo pentru organizatia dumneavoastra',
    s8_4:'Cultura companiei este unica si se poate schimba in functie de stadiul in care se afla compania, lucram indeaproape cu clientii nostrii pentru a-i ajuta sa isi defineasca obiectivele si abilitatile cheie pe care urmaresc sa le dezvolte in interiorul organizatiei.',
    s8_5:'Recomandam cele mai potrivite proiecte pentru cultura companiei tale in functie de obiectivele si abilitatile pe care vreti sa le promovati.',
    s8_6:'Programeaza astazi un demo si afla cum te putem ajuta sa iti dezvolti angajatii.'
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


router.post('/api/contact', function (req, res) {
    mailjet.newContact(JSON.stringify(req.body),function(err,result){
        if(err){
            res.status(500).json(err);
        }else{
            res.status(200).json(result);
        }
    });
});


module.exports = router;
