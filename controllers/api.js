// File name: survey.js
// Author(s): Henry Suh (301004212), Muhammad Ilyas "Staz" Sameer Ismail (301168447)
// Date: Nov 11, 2021

// create a reference to the model
let Survey = require('../models/mc_survey');
let userModel = require('../models/users');
var Users = userModel.userModel;
let SurveyResponse = require('../models/survey_response');
let nodemailer = require('nodemailer');
const { deleteOne } = require('../models/mc_survey');

module.exports.saveResponse = (req, res, next) => {

    let newRes = SurveyResponse({
        surveyID: req.body.surveyID,
        choices: req.body.choices
    });

    // save a new survey in the DB
    SurveyResponse.create(newRes, (err, rs) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating a new survey response."
            });
        }
        else {
            res.send(rs);
        }
    });
}

//sends the user an email of the data from the survey
module.exports.sendMail = async (req, res, next) => {

    let id = req.body.id;
    let username = req.body.Username;

    const resp = SurveyResponse.find({ surveyID: id }).cursor();

    const title = Survey.findOne({ id_: id });

    const email = Users.findOne({ username: username });

    var allResponses = [];

    for (let response = await resp.next(); response != null; response = await resp.next()) {
        allResponses.push(response);
    }

    console.log(allResponses);

    title.select('Title');

    email.select('email');

    title.exec(function (err, title) {
        if (err) return handleError(err);

        email.exec(function (err, email) {
            if (err) return handleError(err);

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "aageros1@gmail.com",
                    pass: "qazwsx!!23"
                }
            });

            const options = {
                from: "aageros1@gmail.com",
                to: email,
                subject: "Survey Data: " + title.Title,
                text: "'" + allResponses + "'"
            };

            transporter.sendMail(options, function (err, data) {
                if (err) {
                    console.log(err);
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while sending an email."
                    });
                }
                else {
                    console.log('Data Sent!');
                    res.send(options);
                }
            })

        });

    });
}

// lists all the surveys
module.exports.surveys = function (req, res, next) {
    Survey.find((err, surveys) => {
        if (err) {
            // return console.error(err);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while listing surveys."
            });
        }
        else {
            res.send(surveys)
        }
    });
}

// shows the user a close-up os a survey
module.exports.details = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, selectedSurvey) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving a survey."
            });
        }
        else {
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
        Username: req.body.Username,
        Time: req.body.Time
    });

    // save a new survey in the DB
    Survey.create(newSurvey, (err, survey) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating a new survey."
            });
        }
        else {
            res.send(survey);
        }
    });
}

module.exports.processQuestionPage = (req, res, next) => {

    let id = req.body.id;
    let question = req.body.question;
    let choices = req.body.choices;

    // push Q & C into the db
    Survey.updateOne({ _id: id }, {
        $push: {
            Questions: question,
            Choices: choices
        }
    }, (err, survey) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating a new question."
            });
        }
        else {
            res.send(survey);
        }
    });

    const timer = Survey.findOne({ _id: id });

    timer.select('_id Time');

    timer.exec(function (err, myTime) {
        if (err) return handleError(err);

        let time = myTime.Time * 60000;

        console.log(time);

        setTimeout(function () {

            Survey.deleteOne({ _id: id }, (err, survey) => {
                if (err) {
                    res.status(500).send({
                        message: "Error occured while deleting a survey"
                    });
                }
                else {
                    if (!survey) {
                        res.status(404).send({
                            message: `Cannot delete Survey with id=${id}. The survey may not exist`
                        });
                    } else {
                        // res.send({
                        //     message: "Survey was deleted successfully"
                        // });
                    }
                }
            });

        }, time)

    });
}

// Handles the processing of the edits done to the survey title
module.exports.processEditTitlePage = (req, res, next) => {

    let id = req.body.id;

    // update date
    Survey.updateOne({ _id: id }, { Title: req.body.title }, (err, updated) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while updating a survey."
            });
        }
        else {
            if (!updated)
                res.status(404).send({ message: "Cannot find the targeted survey" });
            else
                res.send(updated);
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
    update["$set"]["Questions." + index] = question;
    update["$set"]["Choices." + index] = choices;
    Survey.update({ _id: id }, update, (err, updated) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while updating a survey."
            });
        }
        else {
            if (!updated)
                res.status(404).send({ message: "Cannot find the targeted survey" });
            else
                res.send(updated);
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
    Survey.update({ _id: id }, {
        $set: {
            Questions: req.body.questions,
            Choices: req.body.choices
        }
    }, (err, updated) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing a question."
            });
        }
        else {
            if (!updated)
                res.status(404).send({ message: "Cannot find the targeted survey" });
            else
                res.send(updated);
        }
    })

}

module.exports.performDelete = (req, res, next) => {

    let id = req.params.id;

    // Delete a survey matched with the id from DB
    Survey.remove({ _id: id }, (err, survey) => {
        if (err) {
            res.status(500).send({
                message: "Error occured while deleting a survey"
            });
        }
        else {
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
