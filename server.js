const express = require('express');
const app = express();


app.use(express.static('public'));
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
    //res.send('Hello')
    res.render('login')
})

app.get('/q_one', function(req, res) {
    res.render('q_one')
})

app.get('/q_two', function(req, res) {
    res.render('q_two')
})

app.get('/q_three', function(req, res) {
    res.render('q_three')
})

app.get('/leaderboard', function(req, res) {
    res.render('leaderboard')
})

app.get('/leaderboard2', function(req, res) {
    res.render('leaderboard2')
})

app.get('/q2_one', function(req, res) {
    res.render('q2_one')
})

app.get('/q2_two', function(req, res) {
    res.render('q2_two')
})

app.get('/q2_three', function(req, res) {
    res.render('q2_three')
})



app.listen(8081, function() {
    console.log("App on port: 8081")
}) 

