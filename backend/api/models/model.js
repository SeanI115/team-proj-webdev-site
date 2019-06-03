'use strict';

var ObjectId = require('mongodb').ObjectId;

var User = function(user){
    this.name = user.name;
    this.auth_id = user.auth_id;
    this.quiz1t = user.quiz1t;
    this.quiz2t = user.quiz2t;
}

var Score = function(score) {
    this.quizNum = score.quizNum;
    this.quizq = score.quizq;
    this.res = score.res;
}


/* run http://localhost:3000/users */
User.addUser = function(users, newUser, result) {
    var testUser, query, resObj;

    resObj = {name: newUser.name, id: "", userAdded: false};

    testUser = {name: newUser.name, auth_id: newUser.auth_id};
    users.find(testUser).toArray(function(err, res) {
        if(err) {
            res.errMsg = "Error";
            console.log(res.errMsg);
            result(resObj, null);
        } else if(res.length > 0) {
            result(resObj, null);
        } else {
            newUser.quiz1t = 0;
            newUser.quiz2t = 0;
            newUser.answers = [];
            users.insertOne(newUser, function(err2) {
                if(err2) {
                    console.log(err2);
                    result(resObj, null);
                } else {
                    resObj.id = newUser._id;
                    resObj.userAdded = true;
                    result(resObj, null);
                }
            });
        }
    });
};

/* http://localhost:3000/users/5ca993329e06b3f53ccccb06 */
User.getUser = function (users, userId, result) {    
    //TO DO: Insert code here
    var resultObj = {success: false, statusMsg: "", statusObj: null};
    //console.log(userId);

    users.find({_id: new ObjectId(userId)}).toArray(function(err, res) {
        if(err) {
            resultObj.statusMsg = "An error occurred when attempting to access player in database.";
            console.log(resultObj.statusMsg + ": " + JSON.stringify(err));
            resultObj.statusObj = err;
            result(resultObj, null);
        } else if (res.length == 1) {
           resultObj.success = true;
           resultObj.statusMsg = "Player data successfully retrieved.";
           resultObj.data = res[0];
           result(resultObj,null);
        } else { 
            resultObj.statusMsg = "Player could not be found in database";
            result(resultObj,null);
        }
    });
};

User.updateScore = function (users, userId, score, result) {    

    var updateDoc = {_id: new ObjectId(userId)};
    var resObj = {success: false, statusMsg: "", statusObj: null};
    var sd;
    var pId;   
    pId = new ObjectId(userId);

    users.find({_id: new ObjectId(userId)}).toArray(function(err, res) {
        if(err) {
            resObj.statusMsg = "Error 1";
            resObj.statusObj = err;
            result(resObj, null);
        } else if(res.length == 0){
            resObj.statusMsg = "Error: player not found";
            result(resObj, null);
        } else {
            sd = {quizNum: score.quizNum, quizq: score.quizq, res: score.res};
            users.find({_id: new ObjectId(userId), answers: {$elemMatch: {quizNum: sd.quizNum, quizq: sd.quizq}}})
            .toArray(function(err2, res2) {
                if(err2) {
                    resObj.statusMsg = "Error: locating answer to update";
                    resObj.statusObj = err2;
                    result(resObj, null);
                } else if(res2.length == 0) {
                    users.updateOne({_id: new ObjectId(userId)}, {$push: {answers: sd}}, 
                    function(err3, res3) {
                        if(err3) {
                            resObj.statusMsg = "Error 3";
                            resObj.statusObj = err3;
                            result(resObj, null);
                        } else {
                            resObj.statusMsg = "Success";
                            users.find({_id: new ObjectId(userId)}).toArray(function(err4, res4) {
                                if(err4) {
                                    resObj.statusMsg = "error 4";
                                    resObj.statusObj = err4;
                                    result(resObj, null);
                                } else {
                                    
                                        if(sd.quizNum == '1'){
                                            var answert = res4[0].answers;
                                            var quizt = 0;
                                            answert.forEach(function(it) {
                                                if(it.quizNum == '1'){
                                                var x = Number(it.res);
                                                quizt += x;}
                                            });
                                            users.updateOne({_id: new ObjectId(userId)}, {$set: {quiz1t: quizt}}, function(err5, res5) {
                                                if(err5) {
                                                    resObj.statusObj = err5;
                                                    resObj.statusMsg = "Error: updating totals";
                                                    result(resObj, null);
                                                } else {
                                                    resObj.success = true;
                                                    resObj.statusMsg = "Success";
                                                    result(resObj, null);
                                                }
                                            });
                                        }
                                        else if (sd.quizNum == '2'){
                                            var answert = res4[0].answers;
                                            var quizt = 0;
                                            answert.forEach(function(it) {
                                                if(it.quizNum == '2'){
                                                var x = Number(it.res);
                                                quizt += x;}
                                            });
                                            users.updateOne({_id: new ObjectId(userId)}, {$set: {quiz2t: quizt}}, function(err5, res5) {
                                                if(err5) {
                                                    resObj.statusObj = err5;
                                                    resObj.statusMsg = "Error: updating totals";
                                                    result(resObj, null);
                                                } else {
                                                    resObj.success = true;
                                                    resObj.statusMsg = "Success";
                                                    result(resObj, null);
                                                }
                                            });
                                        }
                                }
                            });
                        }
                    });
                } else {
                    users.updateOne({_id: new ObjectId(userId), answers: {$elemMatch: {quizNum: sd.quizNum, quizq: sd.quizq}}},
                    {
                        $set: {
                            'answers.$.res' : sd.res
                        }
                    },
                    function(err6, res6) {
                        if(err6) {
                            resObj.statusMsg = "Error 6";
                            resObj.statusObj = err6;
                            result(resObj, null);
                        } else {
                            users.find({_id: new ObjectId(userId)}).toArray(function(err7, res7) {
                                if(err7) {
                                    resObj.statusMsg = "Error 7";
                                    resObj.statusObj = err7;
                                    result(resObj, null);
                                } else {
                                    
                                    if(sd.quizNum == '1'){
                                        var answert = res4[0].answers;
                                            var quizt = 0;
                                            answert.forEach(function(it) {
                                                if(it.quizNum == '1'){
                                                var x = Number(it.res);
                                                quizt += x;}
                                            });
                                    users.updateOne({_id: new ObjectId(userId)}, {$set: {quiz1t: quizt}}, function(err9, res9) {
                                        if(err9) {
                                            resObj.statusMsg = "err 9";
                                            resObj.statusObj = res9;
                                        } else {
                                            resObj.success = true;
                                            //resObj.statusObj = res9[0].answers;
                                            result(resObj, null);
                                        }
                                    }); 
                                    } else if(sd.quizNum == '2') {
                                        var answert = res4[0].answers;
                                            var quizt = 0;
                                            answert.forEach(function(it) {
                                                if(it.quizNum == '2'){
                                                var x = Number(it.res);
                                                quizt += x;}
                                            });
                                        users.updateOne({_id: new ObjectId(userId)}, {$set: {quiz2t: quizt}}, function(err9, res9) {
                                            if(err9) {
                                                resObj.statusMsg = "err 9";
                                                resObj.statusObj = res9;
                                            } else {
                                                resObj.success = true;
                                                //resObj.statusObj = res9[0].answers;
                                                result(resObj, null);
                                            }
                                        }); 
                                    }
                                }
                        });
                        }
                    });
                }
            });
        }
    });


};


/* http://localhost:3000/users */

/* for leaderboard */
/* http://localhost:3000/users?orderBy=score */ 
User.getAllUsers = function(users, sortBy, result) {

    // update player scores
    users.find().forEach(function(doc) {
        if(!doc._id) {
            print('No doc found');
            return;
        }
    });
    sortBy = "score";
    console.log("sortBy: " + sortBy);
    var resObj = {success: false, statusMsg: "", statusObj: null};
    var sortObj = {};

    if(sortBy != undefined) {
        sortObj[sortBy] = 1;
    } else if (sortBy = "score") {
        sortObj[sortBy] = -1;
    }
    else {
        sortObj.name = 1;
    }

    users.find().sort(sortObj).toArray(function(err,res) {
        if(err) {
            resObj.statusMsg = "An error occured";
            console.log(resObj.statusMsg + ":" + JSON.stringify(err));
            resObj.statusObj = err;
            result(resObj, null);
        } else {
            resObj.success = true;
            resObj.statusMsg = "Data on " + res.length + " users";
            resObj.data = res;
            result(resObj, null);
        }
    });
};

module.exports = {User, Score};