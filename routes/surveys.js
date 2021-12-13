// File name: index.js
// Author(s): Muhammad Ilyas "Staz" Sameer Ismail (301168447)
// Date: 11/10/2021 (November 11th, 2021)

var express = require('express');
var router = express.Router();
let surveyController = require('../controllers/api');

// retrieve a survey matched with id
router.get('/details/:id', surveyController.details);

// create a new question
router.post('/add/question', surveyController.processQuestionPage);

// delete a survey
router.delete('/delete/:id', surveyController.performDelete);

// create a new survey
router.post('/add', surveyController.processAddPage);

// retrieve all surveys
router.get('/list', surveyController.surveys)

router.put('/edit/title/:id', surveyController.processEditTitlePage);

router.put('/edit/question/:id/:idx', surveyController.processEditQuestionPage);

// delete a question
router.put('/edit/delete', surveyController.performDeleteQuestion);

// save a response
router.post('/addres', surveyController.saveResponse);

module.exports = router;
