let ProjectsModel = require('../models/projects');

module.exports.projectsList = async (req, res, next) => {
    try {
        let list = await ProjectsModel.find({});

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
        let project = await ProjectsModel.findOne({ _id: req.params.id });
        if (!project)
            throw new Error('Project not found. Are you sure it exists?') 
        
        res.json({
            success: true,
            message: "Project retrieved successfully.",
            data: project
        });
        
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.processAdd = async (req, res, next) => {
    try {
        let newProject = new ProjectsModel(req.body);

        let result = await ProjectsModel.create(newProject)
        console.log(result);

        res.json({
            success: true,
            message: "Project added successfully.",
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

        let updateProject = new ProjectsModel(req.body);
        updateProject._id = id;

        let result = await ProjectsModel.updateOne({ _id: id }, updateProject)

        if (result.modifiedCount > 0) {
            res.json({
                success: true,
                message: "Project updated successfully."
            });
        }
        else {
            // Express will catch this on its own.
            throw new Error('Project not updated. Are you sure it exists?')
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.performDelete = async (req, res, next) => {
    try {
        let id = req.params.id;

        let result = await ProjectsModel.deleteOne({ _id: id })

        if (result.deletedCount > 0) {
            res.json({
                success: true,
                message: "Project deleted successfully."
            });
        }
        else {
            // Express will catch this on its own.
            throw new Error('Project not deleted. Are you sure it exists?')
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}