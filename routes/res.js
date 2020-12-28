const express = require('express');
const router = express.Router();

//@meth : GET
//route : /connectionStatus
//remark : 
router.get('/connectionStatus', (req, res) => {
    const dbStatus = require('../server').connStatus;
    res.send(`OK 200 : DB Status ${dbStatus}`);
});

module.exports = router;