const { response } = require('express');
const db = require('../models')
const Teacher = db.teacher;

//create new teacher
exports.createNewTeacher = async (req, res) => {
    try {
        let response = {};
        await Teacher.create(req.body)
            .then(data => {
                if (data) {
                    response.message = "teacher added successfully";
                    response.statusCode = 200;
                    response.data = data;
                    res.status(response.statusCode).send(response)
                }
                else {
                    response.message = "unsuccessful, incomplete data";
                    response.statusCode = 200;
                    response.data = data;
                    res.status(response.statusCode).send(response)
                }
            })
            .catch(err => {
                response.message = err.message || "Failed to Add teacher"
                response.statusCode = 500;
                response.data = ""
                res.status(response.statusCode).send(response)
            })
    } catch (error) {
        res.send({
            message:
                error.message || "error occured adding new teacher"
        })
    }
}

//get all teachers
exports.getAllTeachers = async (req, res) => {
    try {
        let response = {};
        await Teacher.findAll({
            where: {
                status: true
            }
        })
            .then(data => {
                if (data) {
                    response.message = "All teachers";
                    response.statusCode = 200;
                    response.data = data
                    res.status(response.statusCode).send(response)
                }
                else {
                    response.message = "No data found"
                    response.statusCode = 200;
                    response.data = data
                    res.status(response.statusCode).send(response)
                }
            })
            .catch(err => {
                response.message = err.message || "Failed to get teachers"
                response.statusCode = 500;
                response.data = " "
                res.status(response.statusCode).send(response)
            })

    } catch (error) {
        res.send({
            message:
                error.message || "error occured  getting teachers"
        })
    }
}

//get teacher by Id
exports.getTeacherById = async (req, res) => {
    try {
        let response = {};
        id = req.params.id
        await Teacher.findByPk(id)
            .then(data => {
            if(data){    
                response.message = " teacher " + id;
                response.statusCode = 200;
                response.data = data;
                res.status(response.statusCode).send(response)
            }
            else{
                response.message = "No data found " + id
                response.statusCode = 200;
                response.data = ""
                res.status(response.statusCode).send(response)
            }
            })
            .catch(err => {
                response.message = err.message || "Failed to get teacher " + id
                response.statusCode = 500;
                response.data = ""
                res.status(response.statusCode).send(response)
            })

    } catch (error) {
        res.status(500).send({
            message:
                error.message || "error occured  getting teacher " + id
        })
    }
}
//update teacher
exports.updateTeacher = async (req, res) => {
    try {
        let response = {};
        id = req.params.id
        await Teacher.update(req.body, {
            where: {
                id: id
            }
        })
            .then(num => {
                if (num == 1) {
                    response.message = "teacher updated successfully ";
                    response.statusCode = 200;
                    response.data = "";
                    res.status(response.statusCode).send(response)
                }
                else {
                    response.message = "No data found " + id
                    response.statusCode = 200;
                    response.data = ""
                    res.status(response.statusCode).send(response)

                }
            })
            .catch(err => {
                response.message = err.message || "teacher update failed " + id
                response.statusCode = 500;
                response.data = ""
                res.status(response.statusCode).send(response)
            })

    } catch (error) {
        res.send({
            message:
                error.message || "error occured  updating teacher " + id
        })
    }
}

//delete all teachers
exports.deleteAllTeachers = async (req, res) => {
    let response = {};
    try {
        await Teacher.destroy({
            where: {},
            truncate: false
        })
            .then(num => {
                if (num == 1) {
                    response.message = "All teachers deleted successfully ";
                    response.statusCode = 200;
                    response.data = "";
                    res.status(response.statusCode).send(response)
                }
                else {
                    response.message =  "no data to delete "
                    response.statusCode = 200;
                    response.data = num;
                    res.status(response.statusCode).send(response)
                }
            })
            .catch(err => {
                response.message = err.message || "teachers delete failed "
                response.statusCode = 500;
                response.data = ""
                res.status(response.statusCode).send(response)
            })

    } catch (error) {
        res.send({
            message:
                error.message || "error occured  updating teacher "
        })
    }
}

//delete teacher by id
exports.deleteOneTeacher = async (req, res) => {
    try {
        let response = {};
       let id = req.params.id
        await Teacher.destroy({
            where: {
                id: id
            }
        })
            .then(num => {
                if (num == 1) {
                    response.message = "teacher deleted successfully ";
                    response.statusCode = 200;
                    response.data = "";
                    res.status(response.statusCode).send(response)
                }
                else {
                    response.message = "no data found " + id
                    response.statusCode = 200;
                    response.data = ""
                    res.status(response.statusCode).send(response)
                }
            })
            .catch(err => {
                response.message = err.message || "teacher delete failed " + id
                response.statusCode = 500;
                response.data = ""
                res.status(response.statusCode).send(response)
            })

    } catch (error) {
        res.send({
            message:
                error.message || "error occured  updating teacher " + id
        })
    }
}
