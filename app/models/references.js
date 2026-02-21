let mongoose = require('mongoose');

let referencesModel = mongoose.Schema(
    {
        firstname: String,
        lastname: String,
        email: String,
        position: String,
        company: String
    },
    {
        collection: "references"
    }
);

// Ensure virtual fields are serialised
referencesModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id
    }
});

module.exports = mongoose.model("References", referencesModel);