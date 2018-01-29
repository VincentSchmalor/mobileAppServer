var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
app.use(bodyParser({limit: '7mb'}));
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json


//DB setup
mongoose.connect("mongodb://mongo:27017/test");

var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: {type: String, required: true},
    password: {type: String, required: true}
});
var tblUser = mongoose.model('tblUser', userSchema);

/**
 * Create (a specific) user(s)
 */
app.post('/users/create', function (req, res) {
    if(!req.body) {
        res.send('Use valid userformat');
        return;
    }
    tblUser.create(req.body, function (err, result) {
        if(err) console.log(err);
        res.send(result);
    });
});

/**
 * Read (a specific) user(s)
 */
app.post('/users/read', function (req, res) {
    tblUser.find(req.body, function (err, result) {
        if(err) console.log(err);
        res.send(result);
    });
});

/**
 * Update a specific user
 */
app.patch('/users/update', function (req, res) {
    tblUser.update(req.body.toupdate, req.body.set, function (err, result) {
        if(err) console.log(err);
        res.send(result);
    });
});

/**
 * Delete (a specific) user(s)
 */
app.delete('/users/delete', function (req, res) {
    tblUser.remove(req.body, function (err) {
        if(err){
            console.log(err);
            return;
        }
        res.send('Deleted');
    })
});

app.listen(3000, function () {
    console.log('Server listening on port 3000!');
});