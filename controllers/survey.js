// File name: survey.js
// Author(s): Henry Suh (301004212), Muhammad Ilyas "Staz" Sameer Ismail (301168447)
// Date: Nov 11, 2021

// create a reference to the model
let Survey = require('../models/mc_survey');
var User = require('../models/users');

// Displaying the survey list
module.exports.surveys = function(req, res, next) {  
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

// Displaying the contents that a survay object holds
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
                survey: selectedSurvey
            })
        }
    });
}

// Displays the view used to add title of a survey
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

    // Create a new object to hold id and title
    // targetIndex is just for possible usages
    // not even used in this app. I forgot to remove it.
    let newSurvey = Survey({
        _id: req.body.id,
        Title: req.body.Title,
        targetIndex: 0,
        //UserID: req.user.id,
        // Questions: [],
        // Choices: [[]]
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
            // redirect to add_question page to add a question
            res.redirect('/surveys/addquestion/' + newSurvey._id);
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
            res.render('surveys/edit', {
                title: 'Edit Survey', 
                survey: survey
            })
        }
    });
    
}

// NOT USED. Just keeping it for possible usages
module.exports.processEditPage = (req, res, next) => {
    
    let id = req.params.id

    // Create a survey object, UserID will be added after authentication
    let updated = Survey({
        _id: req.body.id,
        // UserID: req.body.UserID,
        Title: req.body.Title,
        // Questions: req.body.Questions,
        // Choices: req.body.Choices
    });

    Survey.updateOne({_id: id}, updated, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/surveys/addquestion/' + updated._id);
        }
    });
}

// Displaying the edit title page
module.exports.displayEditTitlePage = (req, res, next) => {
    
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
            });
        }
    });
    
}

// Handles the processing of the edits done to the survey
module.exports.processEditTitlePage = (req, res, next) => {
    
    let id = req.params.id

    // update date
    Survey.updateOne({_id: id}, {Title: req.body.Title}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // redirect the user to the edit page
            // better than redirecting the user to the list
            // when the user finished to edit the title
            res.redirect('/surveys/edit/' + id);
        }
    });
}

// Displaying the edit question page
module.exports.displayEditQuestionPage = (req, res, next) => {
    
    let id = req.params.id;
    let idx = req.params.idx;

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
            res.render('surveys/edit_question', {
                title: 'Edit Survey', 
                survey: survey,
                index: idx
            })
        }
    });
    
}

// Handles the processing of the edits done to the survey
module.exports.processEditQuestionPage = (req, res, next) => {
    
    let id = req.params.id
    let index = req.body.index;
    let choices = req.body.Choices;
    choices = choices.filter(item => item != "");

    // A procedure to add values to a specific index in an array
    update = { "$set": {} };
    update["$set"]["Questions."+index] = req.body.Questions;
    update["$set"]["Choices."+index] = choices;

    // update the db
    Survey.update({_id: id}, update, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // Redirect the user to the edit page
            res.redirect('/surveys/edit/' + id);
        }
    });

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
            // display the edit Q & C view
            res.render('surveys/add_question', {
                title: 'Add Question', 
                survey: survey
            })
        }
    });
    
}

// Handles the processing of adding a question with choices
module.exports.processQuestionPage = (req, res, next) => {
    
    let id = req.params.id;
    // Get the value of the button the user clicked on
    // You can check the values in add_quesiton.ejs
    let inputValue = req.body.btn;
    let choices = req.body.Choices;
    choices = choices.filter(item => item != "");

    // Deleting a survey object in the db
    // when the user clicked on cancel button in new survey mode
    if (inputValue == 'cancel') {
        res.redirect('/surveys/delete/' + id);
    }
    else{
        
        // Create a survey object, UserID will be added after authentication
        let updated = Survey({
            _id: req.body.id,
            // UserID: req.body.UserID,
            Title: req.body.Title,
            targetIndex: req.body.targetIdx
        });

        Survey.updateOne({_id: id}, {
            // push questions and choices into the arrays in the db
            // if you put an object(e.g. updated above) here,
            // it overwrites the existing object in the db
            // which means you will lose all the Q & C previously stored in the db
            $push: { Questions: req.body.Questions,
                     Choices: choices }
        }, (err) => {
            if(err)
            {
                console.log(err);
                res.end(err);
            }
            else
            {
                // if the user clicked on the Next Question button, this will run
                if (inputValue == 'next') {
                    // Don't mind about this stupid targetIndex
                    updated.targetIndex = updated.targetIndex + 1;
                    Survey.findById(id, (err, survey) => {
                        if(err)
                        {
                            console.log(err);
                            res.end(err);
                        }
                        else
                        {
                            // Let the user add more questions
                            res.render('surveys/add_question', {
                                title: 'Add Question', 
                                survey: survey
                            })
                        }
                    });
                }
                // If the user clicked on the Done button, rediect the user to the list
                else if (inputValue == 'done'){
                    res.redirect('/surveys/list');
                }
            }
        });
    }
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

// Diplaying an add_question page when the user is in the edit mode
module.exports.displayEditAddQPage = (req, res, next) => {
    
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
                title: 'Edit Survey', 
                survey: survey
            })
        }
    });
    
}

// Handles the processing of adding a question with choices
// Almost the same as processQuestionPage above
// The reason we have this funciton is we have seperated  ejs files for editing from adding.
module.exports.processEditAddQPage = (req, res, next) => {
    
    let id = req.params.id;
    let choices = req.body.Choices;
    choices = choices.filter(item => item != "");

        Survey.updateOne({_id: id}, {
            // Not to delete already stored Q & C in the db
            $push: { Questions: req.body.Questions,
                     Choices: choices }
        }, (err) => {
            if(err)
            {
                console.log(err);
                res.end(err);
            }
            else
            {
                // Redirecting the user to the edit page
                res.redirect('/surveys/edit/'+id);
            }
        });
}

// Get rid of a survey object from the db
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
            // Refresh or redirect the user to the db
            res.redirect('/surveys/list');
        }
    });
}