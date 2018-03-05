// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================
var friends = require("../data/friends");
// ===============================================================================
// ROUTING
// ===============================================================================
module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });
  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out survey... this data is then sent to the server...
  // Then the server saves the data to the friends Array)
  // ---------------------------------------------------------------------------
  app.post("/api/friends", function(req, res) {
    var userData = req.body
    console.log('userScores = ' + JSON.stringify(userData));

    var userScores = userData.scores;
    var matchName = '';
    var matchImage = '';
    var comparison = 1000

    //loop through friends objects
    for (var i = 0; i < friends.length; i++) {
      var difference = 0
      for (var j = 0; j < userScores.length; j++) {
        difference += Math.abs(friends[i].scores[j] - userScores[j]);
      }
      console.log('difference = ', difference);
      //set lowest difference to comparison, store friend and photo
      if (difference < comparison) {
        comparison = difference;
        matchName = friends[i].name;
        matchImage = friends[i].photo;
      }
    }
    //Add new users
    friends.push(userData)
    //send response
    res.json({name: matchName, photo: matchImage})
  });


};
