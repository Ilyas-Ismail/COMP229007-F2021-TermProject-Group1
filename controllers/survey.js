// File name: survey.js
// Author(s): Henry Suh (301004212)
// Date: Nov 11, 2021

// create a reference to the model
let Survey = require('../models/survey');

module.exports.displaySurveyList = function(req, res, next) {  
    Survey.find((err, surveys) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('surveys/list', {
                title: 'Surveys', 
                surveys: surveys
            })            
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
   
    // create a new survey object
    let newSurvey = Survey();

    // display the add view
    res.render('surveys/add', { 
        title: 'New Survey',
        survey: newSurvey 
    });     
    
}



module.exports.processAddPage = (req, res, next) => {

    let newSurvey = Survey({
        _id: req.body.id,
        name: req.body.name,

    });

    // Insert a new survey into DB
    Survey.create(newSurvey, (err, item) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh
            res.render('/surveys/edit', {
                title: "Edit Survey",
                Survey: newSurvey
            });
        }
    });
}

module.exports.displayEditPage = (req, res, next) => {
    
    let id = req.params.id;

    // Find a specific survey matched with the id
    Survey.findById(id, (err, surveyToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // display the edit view
            res.render('surveys/edit', {
                title: 'Edit Survey', 
                survey: surveyToEdit
            })
        }
    });
    
}

module.exports.processEditPage = (req, res, next) => {
    
    let id = req.params.id

    // Create a survey object
    let updatedSurvey = Survey({
        _id: req.body.id
    });

    // Update the collection
    Survey.updateOne({_id: id}, updatedSurvey, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh
            res.redirect('/surveys/list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    
    let id = req.params.id;

    // Delete a survey matched with the id from DB
    Survey.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh
            res.redirect('/surveys/list');
        }
    });
}