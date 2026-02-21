let mongoose = require('mongoose');

let usersModel = mongoose.Schema(
    {
        firstname: String,
        lastname: String,
        email: String,
        password: String,
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
    }
);

// Ensure virtual fields are serialised
usersModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id
    }
});

module.exports = mongoose.model("Users", usersModel);