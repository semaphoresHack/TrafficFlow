const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

//instantiate
const app = express();

let dbConn = false;
//
const dbUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@trafficflow.sozdf.mongodb.net/trafficFlow?retryWrites=true&w=majority`;
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch(err => console.log(err)).then(() => {
    dbConn = true;
    module.exports.connStatus = dbConn;
})

//middlewares
app.use(bodyParser.urlencoded({extended:true}));


//routing
app.use('/', require('./routes/home'));

app.listen(PORT, () => {
    console.log(`Running at port:${PORT}`);
});