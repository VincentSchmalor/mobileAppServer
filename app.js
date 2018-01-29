var express = require('express');
var app = express();
var mongoose = require('mongoose');

//DB setup
mongoose.connect("mongodb://mongo:27017/test");

var userSchema = mongoose.Schema({
    name: String
});
var userModel = mongoose.model('userModel', userSchema);

app.get('/', function (req, res) {
    userModel.find(function(err, result){
        console.log(result);
        res.send(result);
    });
});

app.post('/:username', function (req, res) {
    var testEntry = new userModel({name: req.params.username});
    testEntry.save(function () {
        console.log("gespeichert");
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});