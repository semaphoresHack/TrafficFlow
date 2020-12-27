const { urlencoded } = require('express');
const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

//instantiate
const app = express();

let dbConn = false;
//
const dbUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@trafficflow.sozdf.mongodb.net/trafficFlow?retryWrites=true&w=majority`;
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch(err => console.log(err)).then(() => module.exports.connStatus = dbConn=true);

//middlewares
app.use(urlencoded({extended:true}));


//routing
app.use('/', require('./routes/home'));

app.listen(PORT, () => {
    console.log(`Running at port:${PORT}`);
});