// File name: survey.js
// Author(s): Henry Suh (301004212), Muhammad Ilyas "Staz" Sameer Ismail (301168447)
// Date: Nov 11, 2021

// create a reference to the model
let Survey = require('../models/mc_survey');
var User = require('../models/users');

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

module.exports.close_up = (req, res, next) => {
    
    let id = req.params.id;

    Survey.findById(id, (err, selectedSurvey) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('surveys/close_up', {
                title: req.body.title, 
                surveys: selectedSurvey
            })
        }
    });
}

// Displays the view used to add a survey

module.exports.displayAddPage = (req, res, next) => {
    // create a new survey object
    let newSurvey = Survey();

    // display the add view
    res.render('surveys/add_edit', { 
        title: 'Create a New Survey',
        survey: newSurvey 
    });     

}

// Handles the processing of adding a survey

module.exports.processAddPage = (req, res, next) => {

    let newSurvey = Survey({
        _id: req.body.id,
        Title: req.body.Title,
        //UserID: req.user.id,
        Questions: req.body.Questions,
        Choices: req.body.Choices
        // $push: 
        // { Questions: req.body.Questions,
        // Choices: req.body.Choices }
    });

    // Insert a new survey into DB
    Survey.create(newSurvey, (err, survey) =>{
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

// Displays the view for the edit page

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

// Handles the processing of the edits done to the survey

module.exports.processEditPage = (req, res, next) => {
    
    let id = req.params.id

    // Create a survey object, UserID will be added after authentication
    let updated = Survey({
        _id: req.body.id,
        // UserID: req.body.UserID,
        Title: req.body.Title,
        Questions: req.body.Questions,
        Choices: req.body.Choices
    });

    Survey.updateOne({_id: id}, updated, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/surveys/list');
        }
    });

    // Update the collection


    // Will be added after authentication

    // if (req.body.UserID != req.user.id) {
    //     res.redirect('/');
    // } else{
    //     Survey.updateOne({_id: id}, updated, (err) => {
    //         if(err)
    //         {
    //             console.log(err);
    //             res.end(err);
    //         }
    //         else
    //         {
    //             res.redirect('/surveys/list');
    //         }
    //     });
    // };
}

// Displays the view to add a question and choices

module.exports.displayQuestionPage = (req, res, next) => {
    
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
            res.render('surveys/add_question', {
                title: 'Add Question', 
                survey: survey
            })
        }
    });
    
}

// Handles the processing of adding a question with choices

module.exports.processQuestionPage = (req, res, next) => {
    
    let id = req.params.id

    // Create a survey object, UserID will be added after authentication
    let updated = Survey({
        _id: req.body.id,
        // UserID: req.body.UserID,
        Title: req.body.Title,
        $push: { Questions: req.body.Questions },
        $push: { Choices: req.body.Choices }
    });

    Survey.updateOne({_id: id}, updated, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/surveys/list');
        }
    });

    // Update the collection, will be added after authentication

    // if (req.body.UserID != req.user.id) {
    //     res.redirect('/');
    // } else{
    //     Survey.updateOne({_id: id}, updated, (err) => {
    //         if(err)
    //         {
    //             console.log(err);
    //             res.end(err);
    //         }
    //         else
    //         {
    //             res.redirect('/surveys/list');
    //         }
    //     });
    // };
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