
const db = require('../models')
const Student = db.student;
const {truncate}=require('fs')

exports.createNewStudent = async (req, res) => {
    let response = {};
    try {
        await Student.create(req.body)
            .then(data => {
                response.message = "student added successfully";
                response.statusCode = 200;
                response.data = data;
                res.status(response.statusCode).send(response)
            })
            .catch(err => {
                response.message = err.message || "Failed to Add student"
                response.statusCode = 500;
                response.data = ""
                res.status(response.statusCode).send(response)
            })
    } catch (error) {
        res.send({
            message:
                error.message || "error occured adding new student"
        })
    }
}

//get all students
exports.getAllStudents = async (req, res) => {
    let response = {};
    try {
        
        await Student.findAll({
            where: {
                isactive: true
            }
        })
            .then(data => {
                if (data) {
                    response.message = "All students";
                    response.statusCode = 200;
                    response.data = data;
                    res.status(response.statusCode).send(response)
                }
                else {
                    response.message = err.message || "No data found"
                    response.statusCode = 200;
                    response.data = ""
                    res.status(response.statusCode).send(response)
                }
            })
            .catch(err => {
                response.message = err.message || "Failed to get students"
                response.statusCode = 500;
                response.data = ""
                res.status(response.statusCode).send(response)
            })

    } catch (error) {
        res.send({
            message:
                error.message || "error occured  getting students"
        })
    }
}

//get student by Id
exports.getStudentById = async (req, res) => {
    let response = {};
    try {
      let  id = req.params.id
        await Student.findByPk(id)
            .then(data => {
                
                if(data){
                response.message = " student " + id;
                response.statusCode = 200;
                response.data = data;
                res.status(response.statusCode).send(response)
            }
            else{
                response.message = " not record found at " + id;
                response.statusCode = 200;
                response.data = data;
                res.status(response.statusCode).send(response)
            }
        })
            .catch(err => {
                response.message = err.message || "Failed to get student " + id
                response.statusCode = 500;
                response.data = ""
                res.status(response.statusCode).send(response)
            })

    } catch (error) {
        res.status(500).send({
            message:
                error.message || "error occured  getting student " + id
        })
    }
}
//update student
exports.updateStudent = async (req, res) => {
    let response = {};
    try {
         let id = req.params.id
        await Student.update(req.body, {
            where: {
                id: id
            }
        })
            .then(num => {
                if (num == 1) {
                    response.message = "student updated successfully ";
                    response.status = 200;
                    response.data = "";
                    res.status(response.status).send(response)
                }
                else {
                    response.message = "no student found at " +id
                    response.status = 200;
                    response.data = ""
                    res.status(response.status).send(response)

                }
            })
            .catch(error => {
                response.message = error.message || "student update failed " +id
                response.status = 500;
                response.data = ""
                res.status(response.status).send(response)
            })

    } catch (error) {
        res.send({
            message:
                error.message || "error occured  updating student " + req.params.id
        })
    }
}
//delete all students
exports.deleteAllStudents = async (req, res) => {
    let response = {};
    try {
        await Student.destroy({
            where:{},
            truncate: false
        })
            .then(num => {
                if (num == 1) {
                    response.message = "All students deleted successfully ";
                    response.statusCode = 200;
                    response.data = "";
                    res.status(response.statusCode).send(response)
                }
                else {
                    response.message =  "No data to delete "
                    response.statusCode = 200;
                    response.data = num;
                    res.status(response.statusCode).send(response)
                }
            })
            .catch(err => {
                response.message = err.message || "students delete failed "
                response.statusCode = 500;
                response.data = ""
                res.status(response.statusCode).send(response)
            })

    } catch (error) {
        res.send({
            message:
                error.message || "error occured  updating student "
        })
    }
}
//delete student by id
exports.deleteOneStudent = async (req, res) => {
    let response = {};
    try {
      let  id = req.params.id
        await Student.destroy({
            where: {
                id: id
            }
        })
            .then(num => {
                if (num == 1) {
                    response.message = "student deleted successfully ";
                    response.statusCode = 200;
                    response.data = "";
                    res.status(response.statusCode).send(response)
                }
                else {
                    response.message =  "no data found " + id
                    response.statusCode = 200;
                    response.data = ""
                    res.status(response.statusCode).send(response)
                }
            })
            .catch(err => {
                response.message = err.message || "student delete failed " + id
                response.statusCode = 500;
                response.data = ""
                res.status(response.statusCode).send(response)
            })

    } catch (error) {
        res.send({
            message:
                error.message || "error occured  updating student " + id
        })
    }
}

//get all students who are not assign courses
/* exports.get_all_students_not_assigned_courses= async(req,res)=>{
    // let Courses=db.courses;
    let Assign_student_courses=db.assign_student_courses
    await Student.findAll({
        // where:{id:},
        attributes:["id","name"],
        include:[{
            // model:Courses,
            model:Assign_student_courses,
            as:"students",
            attributes:["student_id","course_id"],
            where:{course_id:null},
        }]

    })
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.send(err.message)
    })
} */

