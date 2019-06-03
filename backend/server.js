const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient;

const bodyParser = require('body-parser');
const port = process.env.PORT || 27017;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var routes = require('./api/routes/routes');
routes(app);
const uri = "mongodb+srv://dbAdmin:root@puppy-quiz-xy29c.mongodb.net/puppydb?retryWrites=true"

MongoClient.connect(uri, {useNewUrlParser: true})
    .then(client => {
        const db = client.db('puppydb');
        const user = db.collection('puppyquiz');
        app.locals.users = user;
        app.listen(port);
        console.log('Puppy API on port ' + port);
    }).catch(error => console.log(error));


