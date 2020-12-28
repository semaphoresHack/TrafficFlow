const mongoose = require('mongoose');


//Coordinate Sub-Schema
const LocationSchema = new mongoose.Schema({
    type:{
        type: String,
        required: true,
        default: () => 'GeoSpace',
    },
    coordinates:{
        type: [Number],
        required: true,
    },
});

//Report Schema
const ReprtSchema = new mongoose.Schema({
    reportedBy : {
        type : mongoose.Schema.ObjectId,
        required: true,
    },
    category : {
        type : String,
        required : false,
    },
    geoLocation : {
        type : LocationSchema,
        required: true,
    },
    proofs : {
        type : [mongoose.Schema.ObjectId],
        required : true,
        default : Array,
    }

});

const Report = mongoose.model('Report', ReprtSchema);

module.exports = Report;