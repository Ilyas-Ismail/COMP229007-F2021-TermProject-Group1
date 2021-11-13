// File name: index.js
// Author(s): Muhammad Ilyas "Staz" Sameer Ismail (301168447)
// Date: 11/10/2021 (November 11th, 2021)

var express = require('express');
var router = express.Router();
let Survey = require('../models/mc_survey');

/* GET home page. */
router.get('/', function(req, res, next) {
    Survey.find((err, surveys) => {
      if(err)
      {
          return console.error(err);
      }
      else
      {
          res.render('home', {
              title: 'Home', 
              surveys: surveys
          })            
      }
  });
});

// router.get('/surveys/edit/:id', surveyController.displayEditPage);

// router.get('/surveys/survey/:id', surveyController.close_up);

// router.post('/surveys/edit/:id', surveyController.processEditPage);

// router.get('/surveys/addquestion/:id', surveyController.displayQuestionPage);

// router.post('/surveys/addquestion/:id', surveyController.processQuestionPage);

// router.get('/surveys/delete/:id', surveyController.performDelete);

// router.get('/surveys/add', surveyController.displayAddPage);

// router.post('/surveys/add', surveyController.processAddPage);
// router.get('/surveys/list', surveyController.surveys)

module.exports = router;
