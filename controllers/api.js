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
            // return console.error(err);
            res.status(500).send({
                message:
                  err.message || "Some error occurred while listing surveys."
            });
        }
        else
        {
            res.send(surveys)
        }
    });
}

module.exports.details = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, selectedSurvey) => {
        if(err)
        {
            res.status(500).send({
                message:
                  err.message || "Some error occurred while retrieving a survey."
            });
        }
        else
        {
            if (!selectedSurvey)
                res.status(404).send({ message: "The survey does not exist" });
            else
                res.send(selectedSurvey);
        }
    });
}

// Handles the processing of adding a survey
module.exports.processAddPage = (req, res, next) => {

    let newSurvey = Survey({
        Title: req.body.Title,
        UserID: req.body.UserID
    });

    // save a new survey in the DB
    Survey.create(newSurvey, (err, survey) =>{
        if(err)
        {
            res.status(500).send({
                message:
                  err.message || "Some error occurred while creating a new survey."
            });
        }
        else
        {
            res.send(survey);
        }
    });
}

// Handles the processing of adding a question with choices
module.exports.processQuestionPage = (req, res, next) => {
    
    let id = req.body.id;
    let question = req.body.question;
    let choices = req.body.choices;

    // push Q & C into the db
    Survey.updateOne({_id: id}, {
        $push: { Questions: question,
                 Choices: choices }
    }, (err, survey) => {
        if(err)
        {
            res.status(500).send({
                message:
                  err.message || "Some error occurred while creating a new question."
            });
        }
        else
        {
            res.send(survey);
        }
    });
}

// Handles the processing of the edits done to the survey
module.exports.processEditTitlePage = (req, res, next) => {
    
    if (!req.body){
        return res.status(400).send({
            message: "Data is required to be updated"
        });
    }

    let id = req.params.id

    // update date
    Survey.updateOne({_id: id}, {Title: req.body.Title}, (err, updated) => {
        if(err)
        {
            // console.log(err);
            // res.end(err);
            res.status(500).send({
                message:
                  err.message || "Some error occurred while updating a survey."
            });
        }
        else
        {
            if (!updated)
                res.status(404).send({ message: "Cannot find the targeted survey" });
            else
                res.send(updated);
            // res.redirect('/surveys/edit/' + id);
        }
    });
}

// Handles the processing of the edits done to the survey
module.exports.processEditQuestionPage = (req, res, next) => {
    
    let id = req.params.id
    let index = req.body.index;
    let choices = req.body.Choices;
    choices = choices.filter(item => item != "");

    update = { "$set": {} };
    update["$set"]["Questions."+index] = req.body.Questions;
    update["$set"]["Choices."+index] = choices;
    Survey.update({_id: id}, update, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/surveys/edit/' + id);
        }
    })
}

// Handles the processing of adding a question with choices
module.exports.processEditAddQPage = (req, res, next) => {
    
    let id = req.params.id;
    let choices = req.body.Choices;
    choices = choices.filter(item => item != "");

        Survey.updateOne({_id: id}, {
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
                res.redirect('/surveys/edit/'+id);
            }
        });
}

module.exports.performDelete = (req, res, next) => {
    
    let id = req.params.id;

    // Delete a survey matched with the id from DB
    Survey.remove({_id: id}, (err, survey) => {
        if(err)
        {
            res.status(500).send({
                message: "Error occured while deleting a survey"
            });
        }
        else
        {
            if (!survey) {
            res.status(404).send({
                message: `Cannot delete Survey with id=${id}. The survey may not exist`
              });
            } else {
              res.send({
                message: "Survey was deleted successfully"
              });
            }
        }
    });
}