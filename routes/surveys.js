// File name: index.js
// Author(s): Muhammad Ilyas "Staz" Sameer Ismail (301168447)
// Date: 11/10/2021 (November 11th, 2021)

var express = require('express');
var router = express.Router();
let surveyController = require('../controllers/survey');



router.get('/edit/:id', surveyController.displayEditPage);

router.post('/edit/:id', surveyController.processEditPage);

router.get('/add', surveyController.displayAddPage);

router.post('/add', surveyController.processAddPage);
router.get('/list', surveyController.displaySurveyList)

module.exports = router;
