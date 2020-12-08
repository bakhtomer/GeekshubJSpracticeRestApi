const db = require('../models');
// const { okResponse } = require('../utils/utils');
// const Student=db.student;

// const Op = require(db.Sequelize.Op)
const Course = db.course;
const AssignTeacherCourses = db.assign_teacher_courses;
const Teacher = db.teacher
// const constants = require('../utils/constants');
// const { count } = require('console');


//Updating bridge entity requires fours values two for finding and two for updating


/* exports.UpdatTeacherCourse = async (req, res) => {
    try {
        let course, teacher
        let response = {};
        let { tid, cid } = req.query;
        if (tid && cid) {
            await Course.findByPk(cid)
                .then(data => {
                    if (data) {
                        response.statusCode = 200;
                        course = data.id
                    }
                    else {
                        response.statusCode = 200;
                        response.message = "data not found"
                        res.status(response.statusCode).send(response)
                        return;
                    }
                })
                .catch(err => {
                    response.statusCode = 500
                    response.message = err.message || "server error"
                    // console.log(sid,cid)
                    res.status(response.statusCode).send(response)
                })
            await Teacher.findByPk(tid)
                .then(data => {
                    if (data) {
                        response.statusCode = 200;
                        teacher = data.id
                    }
                    else {
                        response.statusCode = 200;
                        response.message = "data not found"
                        res.status(response.statusCode).send(response)
                        return;
                    }
                })
                .catch(err => {
                    response.statusCode = 500
                    response.message = err.message || "server error"
                    res.status(response.statusCode).send(response)
                })
            // console.log(student, course)
            await AssignTeacherCourses.update({
                teacher_id: teacher,
                course_id: course,
                where:{
                    teacher_id:teacher,
                    course_id:course
                }
            })
                .then(data => {
                    response.statusCode = 200
                    response.message = "added successful";
                    response.data = data;
                    res.status(response.statusCode).send(response)
                })
                .catch(err => {
                    response.statusCode = 500
                    response.message = err.message || "server error"
                    res.status(response.statusCode).send(response)
                })
            // console.log(student.id, course.id)
        }
        else {
            response.statusCode = 500;
            response.message = "Invalid data entered, one or more feilds un available"
            response.data = req.query
            res.status(response.statusCode).send(response)
            return
        }
    }
    catch (err) {
        res.send({
            message:
                err.message || "unknown error "
        })
    }

} */

//delete Assign teacher course record
exports.deleteAssignTeacherCourse = async (req, res) => {

    let { tid, cid } = req.query;
    let response = {};
    if (tid, cid) {
        await AssignTeacherCourses.destroy({
            where: {
                teacher_id: tid,
                course_id: cid
            }
        })
            .then(num => {
                if (num == 1) {
                    res.send("deleted successfully")
                }
                else {
                    res.send("failed to delete")
                }
            })
            .catch(err => {
                res.send(err.message)
            })
    }
    else {
        response.statusCode = 500;
        response.message = "Invalid data entered, one or more feilds un available"
        response.data = req.query
        res.status(response.statusCode).send(response)
        return
    }
}



// assign teacher courses
exports.assignTeacherCourse = async (req, res) => {
    try {
        let course, teacher
        let response = {};
        let { tid, cid } = req.query;
        if (tid && cid) {
            await Course.findByPk(cid)
                .then(data => {
                    if (data) {
                        response.statusCode = 200;
                        course = data.id
                    }
                    else {
                        response.statusCode = 200;
                        response.message = "data not found"
                        res.status(response.statusCode).send(response)
                        return;
                    }
                })
                .catch(err => {
                    response.statusCode = 500
                    response.message = err.message || "server error"
                    // console.log(sid,cid)
                    res.status(response.statusCode).send(response)
                })
            await Teacher.findByPk(tid)
                .then(data => {
                    if (data) {
                        response.statusCode = 200;
                        teacher = data.id
                    }
                    else {
                        response.statusCode = 200;
                        response.message = "data not found"
                        res.status(response.statusCode).send(response)
                        return;
                    }
                })
                .catch(err => {
                    response.statusCode = 500
                    response.message = err.message || "server error"
                    res.status(response.statusCode).send(response)
                })
            // console.log(student, course)
            await AssignTeacherCourses.create({
                teacher_id: teacher,
                course_id: course
            })
                .then(data => {
                    response.statusCode = 200
                    response.message = "added successful";
                    response.data = data;
                    res.status(response.statusCode).send(response)
                })
                .catch(err => {
                    response.statusCode = 500
                    response.message = err.message || "server error"
                    res.status(response.statusCode).send(response)
                })
            // console.log(student.id, course.id)
        }
        else {
            response.statusCode = 500;
            response.message = "Invalid data entered, one or more feilds un available"
            response.data = req.query
            res.status(response.statusCode).send(response)
            return
        }
    }
    catch (err) {
        res.send({
            message:
                err.message || "unknown error "
        })
    }

}

// Get all teachers names and courses names who are assigned courses
exports.getAllTeachersAndCoursesNames = async (req, res) => {
    await Course.findAll({
        attributes: ['name'],
        include: [{
            model: AssignTeacherCourses,
            as: "courses_",
            attributes: ['teacher_id'],
            required:true,
            include: [{
                model: Teacher,
                as: "teachers",
                attributes: ['name'],
                // right:true
            }]
        }]
    })
   
        .then(data => {
            res.send(data)
        })
}
// Get teachers and number of courses assigned to them
exports.getTeachersAndNoCoursesAssigned = async (req, res) => {
    await Teacher.findAndCountAll({
        attributes: ['name'],
        required: true,
        include: [{
            model: AssignTeacherCourses,
            as: "teachers",
            attributes: [],
        }],
        // through:{attributes:['course_id']},
        group: ['name']
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send(err.message)
        })
}

/* exports.update = async (req, res) => {
    let response = {};
    let { id,tid, cid } = req.query
    console.log(id,tid,cid)
    try {
        id=parseInt(id)
        tid=parseInt(tid)
        cid=parseInt(cid)
        if (id && (tid || cid)) {
            await AssignTeacherCourses.update({
                teacher_id: tid || null,
                course_id: cid||null,
                id:id
            }, {
                where: {
                       id:id
                }
            })
                .then(num => {
                    if (num == 1) {
                        response.statusCode = 200;
                        response.data = data;
                        response.message = "successfully updated"
                        res.send(response);
                    }
                    else {
                        response.statusCode = 200;
                        response.data = "";
                        response.message = "data not found"
                        res.send(response);
                    }
                })
                .catch(err => {
                    response.statusCode = 500;
                    response.message = err.message || "course failed to add!"
                    response.data = req.body
                    res.send(response)
                })
        } else {
            response.statusCode = 500;
            response.message = "Invalid data entered, one or more feilds un available"
            response.data = req.query
            res.send(response)
        }
    }
    catch (err) {
        res.send({
            message: err.message || "error occured while creating"
        })
    }
} */