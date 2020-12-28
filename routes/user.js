const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const User = require('../models/User');

//meth : GET
//route : /user/:id/info
//remark : 
router.get('/:id/info', (req, res) => {
    const userId = req.params.id;

    User.findById(userId, (err, doc) => {
        if(err){
            res.json(err)
        }else{
            if(doc){
                //user found
                res.json(doc);
            }
            else{
                //error from userApp request
                res.json({
                    error: 'Wrong userID',
                    rectify: 'Check if userID is valid'
                });
            }
        }
    });
});

//meth : POST
//route : /user/new
//remark : create new User
router.post('/new', (req, res) => {
    const {username, phone, reports, rewards} = req.body;
    const updateObj = {};
    if(typeof username != 'undefined'){
        updateObj.username = username;
    }
    if(typeof phone != 'undefined'){
        updateObj.phone = phone;
    }
    if(typeof reports != 'undefined'){
        updateObj.reports = reports;
    }
    if(typeof rewards != 'undefined'){
        updateObj.rewards = rewards;
    }

    let newUser = new User(updateObj);
    newUser.save().then(doc => {
        res.json(doc);
    }).catch(err => res.json(err));
});

module.exports = router;