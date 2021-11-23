// // File name: survey.js
// // Author(s): Henry Suh (301004212), Muhammad Ilyas "Staz" Sameer Ismail (301168447)
// // Date: Nov 11, 2021

// // create a reference to the model
// let Survey = require('../models/mc_survey');
// var User = require('../models/users');


// module.exports.surveys = function(req, res, next) {  
//     Survey.find((err, surveys) => {
//         if(err)
//         {
//             return console.error(err);
//         }
//         else
//         {
//             res.render('surveys/list', {
//                 title: 'Surveys', 
//                 surveys: surveys
//             })            
//         }
//     });
// }

// module.exports.close_up = (req, res, next) => {
    
//     let id = req.params.id;

//     Survey.findById(id, (err, selectedSurvey) => {
//         if(err)
//         {
//             console.log(err);
//             res.end(err);
//         }
//         else
//         {
//             //show the edit view
//             res.render('surveys/close_up', {
//                 title: req.body.title, 
//                 survey: selectedSurvey
//             })
//         }
//     });
// }

// // Displays the view used to add a survey

// module.exports.displayAddPage = (req, res, next) => {
//     // create a new survey object
//     let newSurvey = Survey();

//     // display the add view
//     res.render('surveys/add_edit', { 
//         title: 'Create a New Survey',
//         survey: newSurvey 
//     });     

// }

// // Handles the processing of adding a survey

// module.exports.processAddPage = (req, res, next) => {

//     let newSurvey = Survey({
//         _id: req.body.id,
//         Title: req.body.Title,
//         targetIndex: 0,
//         //UserID: req.user.id,
//         // Questions: [],
//         // Choices: [[]]
//     });

//     // Insert a new survey into DB
//     Survey.create(newSurvey, (err, survey) =>{
//         if(err)
//         {
//             console.log(err);
//             res.end(err);
//         }
//         else
//         {
//             // redirect
//             res.redirect('/surveys/addquestion/' + newSurvey._id);
//         }
//     });
// }

// // Displays the view for the edit page

// module.exports.displayEditPage = (req, res, next) => {
    
//     let id = req.params.id;

//     // Find a specific survey matched with the id
//     Survey.findById(id, (err, survey) => {
//         if(err)
//         {
//             console.log(err);
//             res.end(err);
//         }
//         else
//         {
//             // display the edit view
//             res.render('surveys/edit', {
//                 title: 'Edit Survey', 
//                 survey: survey
//             })
//         }
//     });
    
// }

// // Handles the processing of the edits done to the survey

// module.exports.processEditPage = (req, res, next) => {

//     let id = req.params.id

//     // Create a survey object, UserID will be added after authentication
//     // let updated = Survey({
//     //     _id: req.body.id,
//     //     // UserID: req.body.UserID,
//     //     Title: req.body.Title,
//     //     // Questions: req.body.Questions,
//     //     // Choices: req.body.Choices
//     // });

//     Survey.updateOne({_id: id}, {
//         Title: req.body.Title
//     }, (err, updated) => {
//         if(err)
//         {
//             console.log(err);
//             res.end(err);
//         }
//         else
//         {
//             res.redirect('/surveys/addquestion/' + updated._id);
//         }
//     });
// }

// module.exports.displayEditTitlePage = (req, res, next) => {
    
//     let id = req.params.id;

//     // Find a specific survey matched with the id
//     Survey.findById(id, (err, survey) => {
//         if(err)
//         {
//             console.log(err);
//             res.end(err);
//         }
//         else
//         {
//             // display the edit view
//             res.render('surveys/add_edit', {
//                 title: 'Edit Survey', 
//                 survey: survey
//             });
//         }
//     });
    
// }

// // Handles the processing of the edits done to the survey

// module.exports.processEditTitlePage = (req, res, next) => {
    
//     let id = req.params.id

//     // update date
//     Survey.updateOne({_id: id}, {Title: req.body.Title}, (err) => {
//         if(err)
//         {
//             console.log(err);
//             res.end(err);
//         }
//         else
//         {
//             res.redirect('/surveys/edit/' + id);
//         }
//     });
// }

// module.exports.displayEditQuestionPage = (req, res, next) => {
    
//     let id = req.params.id;
//     let idx = req.params.idx;

//     // Find a specific survey matched with the id
//     Survey.findById(id, (err, survey) => {
//         if(err)
//         {
//             console.log(err);
//             res.end(err);
//         }
//         else
//         {
//             // display the edit view
//             res.render('surveys/edit_question', {
//                 title: 'Edit Survey', 
//                 survey: survey,
//                 index: idx
//             })
//         }
//     });
    
// }

// // Handles the processing of the edits done to the survey

// module.exports.processEditQuestionPage = (req, res, next) => {
    
//     let id = req.params.id
//     let index = req.body.index;
//     let choices = req.body.Choices;
//     choices = choices.filter(item => item != "");

//     // Survey.findById(id, (err, survey) => {
//     //     if(err)
//     //     {
//     //         console.log(err);
//     //         res.end(err);
//     //     }
//     //     else
//     //     {
//     //         survey.Question[index] = req.body.Questions;
//     //         survey.Choices[index] = choices;
//     //         res.redirect('/surveys/edit/' + id);
//     //         // display the edit view
//     //         // res.render('surveys/edit_question', {
//     //         //     title: 'Edit Survey', 
//     //         //     survey: survey,
//     //         //     index: idx
//     //         // })
//     //     }
//     // });

//     update = { "$set": {} };
//     update["$set"]["Questions."+index] = req.body.Questions;
//     update["$set"]["Choices."+index] = choices;
//     Survey.update({_id: id}, update, (err) => {
//         if(err)
//         {
//             console.log(err);
//             res.end(err);
//         }
//         else
//         {
//             res.redirect('/surveys/edit/' + id);
//         }
//     })

//     // Survey.updateOne({_id: id}, {
//     //     $set : {"Questions." + index : req.body.Questions}
//     // }, (err) => {
//     //     if(err)
//     //     {
//     //         console.log(err);
//     //         res.end(err);
//     //     }
//     //     else
//     //     {
//     //         res.redirect('/surveys/edit/' + id);
//     //     }
//     // });
// }

// // Displays the view to add a question and choices

// module.exports.displayQuestionPage = (req, res, next) => {
    
//     let id = req.params.id;

//     // Find a specific survey matched with the id
//     Survey.findById(id, (err, survey) => {
//         if(err)
//         {
//             console.log(err);
//             res.end(err);
//         }
//         else
//         {
//             // display the edit view
//             res.render('surveys/add_question', {
//                 title: 'Add Question', 
//                 survey: survey
//             })
//         }
//     });
    
// }

// // Handles the processing of adding a question with choices

// module.exports.processQuestionPage = (req, res, next) => {
    
//     let id = req.params.id;
//     let inputValue = req.body.btn;
//     let choices = req.body.Choices;
//     choices = choices.filter(item => item != "");

//     if (inputValue == 'cancel') {
//         res.redirect('/surveys/delete/' + id);
//     }
//     else{
        
//         // Create a survey object, UserID will be added after authentication
//         let updated = Survey({
//             _id: req.body.id,
//             // UserID: req.body.UserID,
//             Title: req.body.Title,
//             targetIndex: req.body.targetIdx
//         });

//         Survey.updateOne({_id: id}, {
//             $push: { Questions: req.body.Questions,
//                      Choices: choices }
//         }, (err) => {
//             if(err)
//             {
//                 console.log(err);
//                 res.end(err);
//             }
//             else
//             {
//                 if (inputValue == 'next') {
//                     updated.targetIndex = updated.targetIndex + 1;
//                     Survey.findById(id, (err, survey) => {
//                         if(err)
//                         {
//                             console.log(err);
//                             res.end(err);
//                         }
//                         else
//                         {
//                             res.render('surveys/add_question', {
//                                 title: 'Add Question', 
//                                 survey: survey
//                             })
//                         }
//                     });
//                 }
//                 else if (inputValue == 'done'){
//                     res.redirect('/surveys/list');
//                 }
//             }
//         });
//     }
//     // Update the collection, will be added after authentication

//     // if (req.body.UserID != req.user.id) {
//     //     res.redirect('/');
//     // } else{
//     //     Survey.updateOne({_id: id}, updated, (err) => {
//     //         if(err)
//     //         {
//     //             console.log(err);
//     //             res.end(err);
//     //         }
//     //         else
//     //         {
//     //             res.redirect('/surveys/list');
//     //         }
//     //     });
//     // };
// }

// module.exports.displayEditAddQPage = (req, res, next) => {
    
//     let id = req.params.id;

//     // Find a specific survey matched with the id
//     Survey.findById(id, (err, survey) => {
//         if(err)
//         {
//             console.log(err);
//             res.end(err);
//         }
//         else
//         {
//             // display the edit view
//             res.render('surveys/add_question', {
//                 title: 'Edit Survey', 
//                 survey: survey
//             })
//         }
//     });
    
// }

// // Handles the processing of adding a question with choices

// module.exports.processEditAddQPage = (req, res, next) => {
    
//     let id = req.params.id;
//     let choices = req.body.Choices;
//     choices = choices.filter(item => item != "");

//         Survey.updateOne({_id: id}, {
//             $push: { Questions: req.body.Questions,
//                      Choices: choices }
//         }, (err) => {
//             if(err)
//             {
//                 console.log(err);
//                 res.end(err);
//             }
//             else
//             {
//                 res.redirect('/surveys/edit/'+id);
//             }
//         });
// }

// module.exports.performDelete = (req, res, next) => {
    
//     let id = req.params.id;

//     // Delete a survey matched with the id from DB
//     Survey.remove({_id: id}, (err) => {
//         if(err)
//         {
//             console.log(err);
//             res.end(err);
//         }
//         else
//         {
//             // refresh
//             res.redirect('/surveys/list');
//         }
//     });
// }