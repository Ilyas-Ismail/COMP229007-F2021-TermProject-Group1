// File name: index.js
// Author(s): Muhammad Ilyas "Staz" Sameer Ismail (301168447)
// Date: 11/10/2021 (November 11th, 2021)

var express = require('express');
var router = express.Router();
let surveyController = require('../controllers/api');

router.get('/details/:id', surveyController.close_up);

router.get('/edit/:id', surveyController.displayEditPage);

router.post('/edit/:id', surveyController.processEditPage);

router.get('/edit/title/:id', surveyController.displayEditTitlePage);

router.post('/edit/title/:id', surveyController.processEditTitlePage);

router.get('/edit/question/:id/:idx', surveyController.displayEditQuestionPage);

router.post('/edit/question/:id/:idx', surveyController.processEditQuestionPage);

router.get('/editadd/:id', surveyController.displayEditAddQPage);

router.post('/editadd/:id', surveyController.processEditAddQPage);

router.get('/addquestion/:id', surveyController.displayQuestionPage);

router.post('/addquestion/:id', surveyController.processQuestionPage);

router.get('/delete/:id', surveyController.performDelete);

router.get('/add', surveyController.displayAddPage);

router.post('/add', surveyController.processAddPage);
router.get('/list', surveyController.surveys)

module.exports = router;
