const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFS = require('multer-gridfs-storage');
const router = express.Router();

//setup storageengine
const dbUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@trafficflow.sozdf.mongodb.net/trafficFlow?retryWrites=true&w=majority`;
const connection= mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const storage = GridFS({
    db: connection,
    file: (req, file) => {
        return {
            filename: 'proof_' + Date.now(),
            bucketName: 'proofs',
        }
    }
});
const upload = multer({storage});

const User = require('../models/User');
const Report = require('../models/Report');

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
    const {username, phone, reports, rewards, email} = req.body;
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
    if(typeof email != 'undefined'){
        updateObj.email = email;
    }

    let newUser = new User(updateObj);
    newUser.save().then(doc => {
        res.json(doc);
    }).catch(err => res.json(err));
});


//meth : POST
//route : /user/:id/report
//remark : register new complait by :id
router.post('/:id/report', upload.fields([{name:"proofs", maxCount: 8}]), (req, res) => {
    const reportedBy = req.params.id;
    const {category, geoLocation, description} = req.body;
    const files = req.files ? req.files['proofs'] : null;
    console.log('body', req.body);
    if(!reportedBy || !category || !geoLocation || !files){
        res.json({
            error: "Fields can't be empty",
            rectify: "LookUp POST data structure"
        });
        return;
    }
    let proofs = new Array();
    files.forEach(proof=> {
        proofs.push(proof.filename);
    });
    let newReport = new Report({
        reportedBy,
        category,
        geoLocation,
        proofs,
        description : description?description:'',
    });
    let reportId = null;
    newReport.save().then(doc => {
        reportId = doc.id;
        res.json(doc);
            //after response add report to User
        User.updateOne({_id:reportedBy}, {
                $push: {
                    reports : reportId
                }
            },
        (err, doc) => {
            if(err){
                console.log(err);
            }
        });

    }).catch(err => {
        console.log();
        res.json({
            error : "Can't Save the Report",
            rectify : "Internal Server Error",
        })
    });

});

//meth : GET
//route : /user/:id/report
//remark : get reports meta data for user(:id), no multimedia
router.get("/:id/report",  (req, res) => {
    const userId = req.params.id;

    let reports = new Array();
    User.findById(userId, async (err, user) => {
        if(err){
            console.log(err);
        }
        else{
            if(user){
                reports = await user.toObject().reports;
                reports.map(obj => mongoose.Schema.ObjectId(obj));
            
                Report.find({
                    '_id' : {
                        $in : reports
                    }
                },
                (err, reps) => {
                    let arr = [];
                    reps.forEach(rep => {
                        let report = {};
                        report.id = rep.id;
                        report.category = rep.category;
                        report.geoLocation = rep.geoLocation;
                        report.description = rep.description;
                        arr.push(report);
                    });
                    return res.json(arr);
                })
            }
            else{
                res.json({
                    error : "No User with ID",
                    rectify : "Use appropriate User ID"
                });
            }
        }
    });


})



module.exports = router;