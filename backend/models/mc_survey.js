// File name: mc_survey.js
// Author(s): Henry Suh (301004212)
// Date: Nov 11, 2021

let mongoose = require('mongoose');

// Create a model class
let mc_surveySchema = mongoose.Schema(
    {
        Title: {
            type: String,
            required: true,
        },
        UserID: String,
        Questions: {
            type: [],
        },
        Choices: {
            type: [[]],
        },
        targetIndex: Number
    },
    {
        collection: "text_survey"
    }
);

module.exports = mongoose.model('Survey', mc_surveySchema);