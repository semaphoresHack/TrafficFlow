const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

//instantiate
const app = express();

let dbConn = false;
//
const dbUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@trafficflow.sozdf.mongodb.net/trafficFlow?retryWrites=true&w=majority`;
const connection=  mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch(err => console.log(err)).then(() => {
    dbConn = true;
    module.exports.connStatus = dbConn;
    module.exports.connection = connection;
})

//middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));


//routing
app.use('/', require('./routes/home'));
app.use('/user', require('./routes/user'));
app.use('/res', require('./routes/res'));
app.use('/report', require('./routes/report'));

app.listen(PORT, () => {
    console.log(`Running at port:${PORT}`);
});