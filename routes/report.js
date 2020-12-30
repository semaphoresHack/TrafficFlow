const express = require('express');
const mongoose = require('mongoose');
const GridFS = require('multer-gridfs-storage')
const multer = require('multer')
const router = express.Router();

//setup storageengine
const dbUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@trafficflow.sozdf.mongodb.net/trafficFlow?retryWrites=true&w=majority`;
const connection= mongoose.createConnection(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
let gfs;
connection.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(connection.db, {
        bucketName: 'fs'
    })
})

const getFile = async (fileId) => {
    gfs.find({'id':fileId}).toArray((err, files) => {
        if(!files || files[0].lenght===0){
            return Error('File not Found');
        }
        else{
            return files[0];
        }
    })
}

const Report = require('../models/Report');

//@meth : GET
//route : /report/:id
//remark : Get Report
router.get('/:id', (req, res) => {
    const reportId = req.params.id;
    Report.findById(reportId, (err,report) => {
        if(err){
            console.log(err);
        }
        else{
            if(report){
                const files = report.toObject().proofs;
                let arr = [];
                files.forEach(file => {
                    arr.push(file);
                    gfs.createReadStream({id:file}).pipe(res);
                });
            }
            else{
                return res.json({
                    error : "Invalid Report ID",
                    rectify : "Enter correct Report ID",
                })
            }
        }
    })

});

module.exports = router;