// File name: db.js
// Author(s): Muhammad Ilyas "Staz" Sameer Ismail (301168447)
// Date: 11/10/2021 (November 11th, 2021)

module.exports = {
    // "URI": "mongodb+srv://admin:KPxwj6d89gGDedy7@termmongodb.bmpv8.mongodb.net/surveys?retryWrites=true&w=majority",
    // "secret": "$C&F)J@McQfTjWnZr4u7x!A%D*G-KaPdRgUkXp2s5v8y/B?E(H+MbQeThVmYq3t6"
    "URI": process.env.ATLASDB,
    "secret" : process.env.SECRETKEY


}