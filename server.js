var express = require('express');
var app = express();

/////////////////////////////////////////////////////////////////////

 var firebase = require('firebase');                               //for firebase
  // Initialize Firebase
  var config = {
    apiKey: "<API KEY>",
    authDomain: "node-sample-ad3ef.firebaseapp.com",
    databaseURL: "https://node-sample-ad3ef.firebaseio.com",
    storageBucket: "node-sample-ad3ef.appspot.com",
    messagingSenderId: "931506106739"
  };
  firebase.initializeApp(config);
var ref = firebase.database().ref();  //for firebase
var datetime = new Date();
//console.log(datetime);
var usersRef = ref.child("user");										//for firebase
//////////////////////////////////////////////////////////////////////
app.use(express.static('public'));
app.get('/get_user.html', function (req, res) {
res.sendFile( __dirname + "/" + "get_user.html" );
})

app.get('/process_get', function (req, res) {
// Prepare output in JSON format
response = {
first_name:req.query.first_name,
last_name:req.query.last_name
};

 usersRef.push().set(response);  //set value to firebase ..push is used to generate a unique key

console.log(response);
res.end(JSON.stringify(response));
})

app.post('/', function(req, res) {
  usersRef.on("value", function(snapshot) {
  console.log(snapshot.val());
  res.end(JSON.stringify(snapshot.val()));
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});
});



var server = app.listen(8081, function () {
var host = server.address().address
var port = server.address().port

console.log("Server running at http://127.0.0.1:%s",port)
})
