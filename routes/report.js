const express = require('express');
const router = express.Router();

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
                res.json(report);
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