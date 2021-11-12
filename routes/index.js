// File name: index.js
// Author(s): Muhammad Ilyas "Staz" Sameer Ismail (301168447)
// Date: 11/10/2021 (November 11th, 2021)

var express = require('express');
var router = express.Router();
let surveyController = require('../controllers/survey');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Home' });
});

router.get('/surveys/edit:id', surveyController.displayEditPage);

router.post('/surveys/edit:id', surveyController.processEditPage);

router.get('/surveys/add', surveyController.displayAddPage);

router.post('/surveys/add', surveyController.processAddPage);

module.exports = router;
