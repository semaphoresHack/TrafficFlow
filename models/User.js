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
    },
    reports : {
        type: [mongoose.SchemaTypes.ObjectId],
        required : true,
        default : Array
    },
    rewards : {
        type: Number,
        required: true,
        default: 0
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;