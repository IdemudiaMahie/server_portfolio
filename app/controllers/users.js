let UsersModel = require('../models/users');

module.exports.usersList = async (req, res, next) => {
    try {
        let list = await UsersModel.find({});

        res.json({
            success: true,
            message: "Users list retrieved successfully.",
            data: list
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.getByID = async function (req, res, next) {
    try {
        let user = await UsersModel.findOne({ _id: req.params.id });
        if (!user)
            throw new Error('User not found. Are you sure it exists?') 
        
        res.json({
            success: true,
            message: "User retrieved successfully.",
            data: user
        });
        
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.processAdd = async (req, res, next) => {
    try {
        let newUser = new UsersModel(req.body);
        
        // Set created and updated dates
        newUser.created = new Date();
        newUser.updated = new Date();
        
        let result = await UsersModel.create(newUser)

        res.json({
            success: true,
            message: "User added successfully.",
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
        let updateUser = new UsersModel(req.body);
        updateUser._id = id;
        updateUser.updated = new Date(); // Update the updated timestamp
        
        let result = await UsersModel.updateOne({ _id: id }, updateUser)

        if (result.modifiedCount > 0) {
            res.json({
                success: true,
                message: "User updated successfully."
            });
        }
        else {
            throw new Error('User not updated. Are you sure it exists?')
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.performDelete = async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await UsersModel.deleteOne({ _id: id })

        if (result.deletedCount > 0) {
            res.json({
                success: true,
                message: "User deleted successfully."
            });
        }
        else {
            throw new Error('User not deleted. Are you sure it exists?')
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}