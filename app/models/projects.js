let mongoose = require('mongoose');

let projectsModel = mongoose.Schema(
    {
        title: String,
        completion: Date,
        description: String,
    },
    {
        collection: "projects"
    }
);


// Ensure virtual fields are serialised.
projectsModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id
    }
});

module.exports = mongoose.model("Projects", projectsModel);