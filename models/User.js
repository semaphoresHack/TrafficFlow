const mongoose = require('mongoose');

//USer Schema
const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        default: () => 'Guest',
    },
    phone : {
        type: String,
        required: true,
        index: true,
    },
    reports : {
        type: [mongoose.SchemaTypes.ObjectId],
        required : true,
        default : Array
    },
    email : {
        type: String,
        required: true,
        index: true,
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;