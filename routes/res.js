const express = require('express');
const mongoose = require('mongoose');
const {createModel} = require('mongoose-gridfs');
const router = express.Router();

const dbUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@trafficflow.sozdf.mongodb.net/trafficFlow?retryWrites=true&w=majority`;
const conn = mongoose.createConnection(dbUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

let Resource;
(async () => {
    await conn.once('open', () => {
        Resource = new mongoose.mongo.GridFSBucket(conn.db, {
            bucketName : 'proofs',
        })
    });
})();

const binarydata = (filename, res) => {
    try{
        Resource.openDownloadStreamByName(filename).pipe(res);
    }
    catch (err) {
        res.send(err);
    }
}

//@meth : GET
//route : /res/:id (ID is of filesystem file)
//remark : this is media endpoint, response wil be binary
router.get('/:name', (req, res) => {
    const resourseName = req.params.name;
    binarydata(resourseName, res);
});

module.exports = router;