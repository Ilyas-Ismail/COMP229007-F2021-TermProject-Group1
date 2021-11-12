// File name: survey.js
// Author(s): Henry Suh (301004212)
// Date: Nov 11, 2021

// create a reference to the model
let Survey = require('../models/survey');

module.exports.surveys = function(req, res, next) {  
    Survey.find((err, surveys) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('surveys/surveys', {
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
    res.render('surveys/new', { 
        title: 'New Survey'

        //survey: newSurvey 
    });     

}

module.exports.processAddPage = (req, res, next) => {

    let newSurvey = Survey({
        
        type: req.body.surveyType,
        name: req.body.name
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
            res.redirect('/surveys/edit');
        }
    });
}

module.exports.displayEditPage = (req, res, next) => {
    
    let id = req.params.id;

    // Find a specific survey matched with the id
    Survey.findById(id, (err, survey) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // display the edit view
            res.render('surveys/add_edit', {
                title: 'Edit Survey', 
                survey: survey
            })
        }
    });
    
}

module.exports.processEditPage = (req, res, next) => {
    
    let id = req.params.id

    // Create a survey object
    let updated = Survey({
        _id: req.body.id
    });

    // Update the collection
    Survey.updateOne({_id: id}, updated, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh
            res.redirect('/surveys');
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
            res.redirect('/surveys');
        }
    });
}