const mongoose = require('mongoose');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema(
{
    firstname: String,
    lastname: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
},
{
    collection: "users"
});



UserSchema.virtual('password')
.set(function(password){
    this._password = password;
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hashed_password = this.encryptPassword(password);
})
.get(function(){
    return this._password;
});

UserSchema.methods.encryptPassword = function(password){
    return crypto
        .pbkdf2Sync(password, this.salt, 10000, 64, 'sha512')
        .toString('hex');
};

UserSchema.methods.authenticate = function(password){
    return this.encryptPassword(password) === this.hashed_password;
};




UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret){
        delete ret._id;
        delete ret.hashed_password;
        delete ret.salt;
    }
});














// const mongoose = require('mongoose');
// const crypto = require('crypto');

// const UserSchema = new mongoose.Schema({
//     firstname: String,
//     lastname: String,
//     email: {
//         type: String,
//         unique: true
//     },
//     username: {
//         type: String,
//         unique: true
//     },
//     hashed_password: String,
//     salt: String,
//     created: { type: Date, default: Date.now },
//     updated: { type: Date, default: Date.now }
// });






// let mongoose = require('mongoose');

// let usersModel = mongoose.Schema(
//     {
//         firstname: String,
//         lastname: String,
//         email: String,
//         password: String,
//         created: {
//             type: Date,
//             default: Date.now
//         },
//         updated: {
//             type: Date,
//             default: Date.now
//         }
//     },
//     {
//         collection: "users"
//     }
// );

// // Ensure virtual fields are serialised
// usersModel.set('toJSON', {
//     virtuals: true,
//     versionKey: false,
//     transform: function (doc, ret) {
//         delete ret._id
//     }
// });

// module.exports = mongoose.model("Users", usersModel);