let ReferencesModel = require('../models/references');

module.exports.referencesList = async (req, res, next) => {
    try {
        let list = await ReferencesModel.find({});

        res.json({
            success: true,
            message: "References list retrieved successfully.",
            data: list
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.getByID = async function (req, res, next) {
    try {
        let reference = await ReferencesModel.findOne({ _id: req.params.id });
        if (!reference)
            throw new Error('Reference not found. Are you sure it exists?') 
        
        res.json({
            success: true,
            message: "Reference retrieved successfully.",
            data: reference
        });
        
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.processAdd = async (req, res, next) => {
    try {
        let newReference = new ReferencesModel(req.body);
        let result = await ReferencesModel.create(newReference)

        res.json({
            success: true,
            message: "Reference added successfully.",
            data: result
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.processEdit = async (req, res, next) => {
    try {
        let id = req.params.id;
        let updateReference = new ReferencesModel(req.body);
        updateReference._id = id;
        let result = await ReferencesModel.updateOne({ _id: id }, updateReference)

        if (result.modifiedCount > 0) {
            res.json({
                success: true,
                message: "Reference updated successfully."
            });
        }
        else {
            throw new Error('Reference not updated. Are you sure it exists?')
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.performDelete = async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await ReferencesModel.deleteOne({ _id: id })

        if (result.deletedCount > 0) {
            res.json({
                success: true,
                message: "Reference deleted successfully."
            });
        }
        else {
            throw new Error('Reference not deleted. Are you sure it exists?')
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}