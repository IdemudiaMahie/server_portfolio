let ServicesModel = require('../models/services');

module.exports.servicesList = async (req, res, next) => {
    try {
        let list = await ServicesModel.find({});

        res.json({
            success: true,
            message: "Services list retrieved successfully.",
            data: list
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.getByID = async function (req, res, next) {
    try {
        let service = await ServicesModel.findOne({ _id: req.params.id });
        if (!service)
            throw new Error('Service not found. Are you sure it exists?') 
        
        res.json({
            success: true,
            message: "Service retrieved successfully.",
            data: service
        });
        
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.processAdd = async (req, res, next) => {
    try {
        let newService = new ServicesModel(req.body);
        let result = await ServicesModel.create(newService)

        res.json({
            success: true,
            message: "Service added successfully.",
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
        let updateService = new ServicesModel(req.body);
        updateService._id = id;
        let result = await ServicesModel.updateOne({ _id: id }, updateService)

        if (result.modifiedCount > 0) {
            res.json({
                success: true,
                message: "Service updated successfully."
            });
        }
        else {
            throw new Error('Service not updated. Are you sure it exists?')
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.performDelete = async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await ServicesModel.deleteOne({ _id: id })

        if (result.deletedCount > 0) {
            res.json({
                success: true,
                message: "Service deleted successfully."
            });
        }
        else {
            throw new Error('Service not deleted. Are you sure it exists?')
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}