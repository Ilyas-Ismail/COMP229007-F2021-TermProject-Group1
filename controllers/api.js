// File name: survey.js
// Author(s): Henry Suh (301004212), Muhammad Ilyas "Staz" Sameer Ismail (301168447)
// Date: Nov 11, 2021

// create a reference to the model
let Survey = require('../models/mc_survey');
var User = require('../models/users');
let SurveyResponse = require('../models/survey_response');

module.exports.saveResponse = (req, res, next) => {

    let newRes = SurveyResponse({
        surveyID: req.body.surveyID,
        choices: req.body.choices
    });

    // save a new survey in the DB
    SurveyResponse.create(newRes, (err, rs) =>{
        if(err)
        {
            res.status(500).send({
                message:
                  err.message || "Some error occurred while creating a new survey response."
            });
        }
        else
        {
            res.status(200).json(rs);
            // res.send(rs);
        }
    });
}

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
            res.status(200).json(surveys);
            // res.send(surveys)
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
                res.status(200).json(selectedSurvey);
                // res.send(selectedSurvey);
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
            res.status(200).json(survey);
            // res.send(survey);
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
            res.status(200).json(survey);
            // res.send(survey);
        }
    });
}

// Handles the processing of the edits done to the survey
module.exports.processEditTitlePage = (req, res, next) => {
    
    let id = req.body.id

    // update date
    Survey.updateOne({_id: id}, {Title: req.body.title}, (err, updated) => {
        if(err)
        {
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
                res.status(200).json(updated);
                // res.send(updated);
        }
    });
}

// Handles the processing of the edits done to the survey
module.exports.processEditQuestionPage = (req, res, next) => {
    
    let index = req.params.idx;
    let id = req.body.id
    let question = req.body.question;
    let choices = req.body.choices;
    console.log(req.body.question);
    console.log(req.body.choices);

    update = { "$set": {} };
    update["$set"]["Questions."+index] = question;
    update["$set"]["Choices."+index] = choices;
    Survey.update({_id: id}, update, (err, updated) => {
        if(err)
        {
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
            res.status(200).json(updated);
                // res.send(updated);
        }
    })
}

module.exports.performDeleteQuestion = (req, res, next) => {
    
    let id = req.body.id;
    let idx = req.body.idx;
    console.log(req.body.id);
    console.log(req.body.questions);
    console.log(req.body.choices);

    // update = { "$set": {} };
    // update["$set"]["Questions"]["$concatArrays"] = [{"$slice": ["$Questions", idx]}, {"$slice": ["$Questions", {"$add": [1, idx]}]}];
    // update["$set"]["Choices"]["$concatArrays"] = [{"$slice": ["$Choices", idx]}, {"$slice": ["$Choices", {"$add": [1, idx]}]}];

    // update = { "$set": {} };
    // update["$set"]["Questions"] = req.body.Questions;
    // update["$set"]["Choices"] = req.body.Choices;
    // Delete a question matched with the id from DB
    Survey.update({_id: id}, {
            $set: { Questions: req.body.questions,
                     Choices: req.body.choices }
    }, (err, updated) => {
        if(err)
        {
            res.status(500).send({
                message:
                  err.message || "Some error occurred while removing a question."
            });
        }
        else
        {
            if (!updated)
                res.status(404).send({ message: "Cannot find the targeted survey" });
            else
            res.status(200).json(updated);
                // res.send(updated);
        }
    })

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
                res.status(200).json({
                    success: true,
                    message: "Survey was deleted successfully"
                });
            //   res.send({
            //     message: "Survey was deleted successfully"
            //   });
            }
        }
    });
}