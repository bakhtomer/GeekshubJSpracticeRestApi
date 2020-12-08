// requires model to be used
//initialize the instance of model
// required libraries for operattions

const { truncate } = require('fs');
const db = require('../models')

// const User = db.user;
const Op = db.Sequelize.Op
const Course = db.course;

//create new course
exports.createNewCourse = async (req, res) => {

    //Validation
    let response = {};
    try {
        await Course.create(req.body)
            .then(data => {

                response.statusCode = 200;
                response.data = data;
                response.message = "successfully added"
                res.send(response);
            })
            .catch(err => {

                response.statusCode = 500;
                response.message = "course failed to add!"
                response.data = req.body
                send(response)
            })
    }
    catch (err) {
        res.send({
            message: err.message || "error occured while creating"
        })
    }

}
// get all courses
exports.getAllCourses = async (req, res) => {
    let response = {};
    try {
        await Course.findAll({
            where: {
                status: true
            }
        })
            .then(data => {
                response.statusCode = 200;
                response.data = data;
                response.message = "All courses"
                res.status(response.statusCode).send(response);
            })
            .catch(err => {

                response.statusCode = 500;
                response.message = "failed to load courses!"
                response.data = req.body
                res.status(response.statusCode).send(response)
            })
    }
    catch (err) {
        res.send({
            message: err.message || "error occured while creating"
        })
    }
}
//get course by id
exports.getCourseById = async (req, res) => {
    let response = {};
    try {
        let { id } = req.params;
        await Course.findByPk(id)
            .then(data => {
                if (data) {
                    response.message = `Course By id${id}`;
                    response.data = data;
                    response.status = 200;
                    res.status(response.status).send(response)
                } else {
                    response.message = "No Course found.";
                    response.data = data;
                    response.status = 200;
                    res.status(response.status).send(response)
                }
            })
            .catch(err => {
                response.message = "No Course found.";
                response.data = data;
                response.status = 500;
                res.status(response.status).send(response)
            })
    }
    catch (err) {
        res.status(500).send({
            message:
                err.message || "error occured getting record "
        })
    }
}
exports.updateCourse = async (req, res) => {
    try {
        let response = {};
        await Course.update(req.body, {
            where: {
                id: req.params.id
            }
        })
            .then(num => {
                if (num == 1) {
                    response.message = "course updated successfully";
                    response.data = "";
                    response.status = 200;
                    res.status(response.status).send(response)
                }
                else {
                    response.message = "No Course found. " + req.params.id;
                    response.data = "";
                    response.status = 200;
                    res.status(response.status).send(response)
                }
            })
            .catch(err => {
                response.message = "No Course found.";
                response.data = data;
                response.status = 500;
                res.status(response.status).send(response)
            })

    }
    catch (err) {
        res.send({
            message: err.message || "error occured while updating"
        })
    }
}
//delete course
exports.deleteCourseById = async (req, res) => {
    try {
        let response = {};
        Course.destroy({
            where: { id: req.params.id }
        })
            .then(num => {
                if (num == 1) {
                    response.message = "course deleted successfully";
                    response.data = "";
                    response.status = 200;
                    res.status(response.status).send(response)
                }
                else {
                    response.message = "No Course found. " + req.params.id;
                    response.data = "";
                    response.status = 200;
                    res.status(response.status).send(response)
                }
            })
            .catch(err => {
                response.message = "failed to delete course";
                response.data = data;
                response.status = 500;
                res.status(response.status).send(response)
            })

    }
    catch (err) {
        res.send({
            message: err.message || "error occured while deleting course"
        })
    }
}
exports.deleteAllCourses = async (req, res) => {
    let response = {};
    try {
    
        Course.destroy({
            where: {},
            truncate: false
        })
            .then(num => {
                if (num == 1) {
                    response.message = "courses deleted successfully";
                    response.data = "";
                    response.status = 200;
                    res.status(response.status).send(response)
                }
                else {
                    response.message = "No data found. " 
                    response.data = "";
                    response.status = 200;
                    res.status(response.status).send(response)
                }
            })
            .catch(err => {
                response.message = "failed to delete courses";
                response.data = data;
                response.status = 500;
                res.status(response.status).send(response)
            })

    }
    catch (err) {
        res.send({
            message: err.message || "error occured while deleting courses"
        })
    }
}