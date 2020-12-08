
// const { Sequelize } = require('../models');
const db = require('../models')
const Course = db.course;
const Student = db.student;
const AssignStudentCourses = db.assign_student_courses;


//Updating bridge entity requires fours values two for finding and two for updating
/* exports.UpdateStudentCourse = async (req, res) => {
    try {
        let course, student
        let response = {};
        let { sid, cid } = req.query;
        if (sid && cid) {
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
            await Student.findByPk(sid)
                .then(data => {
                    if (data) {
                        response.statusCode = 200;
                        student = data.id
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
            console.log(student, course)
            await AssignStudentCourses.update({
                student_id: student,
                course_id: course,
                where:{
                    student_id:student,
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

// Assign Students Courses
exports.assignStudentCourse = async (req, res) => {
    try {
        let course, student
        let response = {};
        let { sid, cid } = req.query;
        if (sid && cid) {
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
            await Student.findByPk(sid)
                .then(data => {
                    if (data) {
                        response.statusCode = 200;
                        student = data.id
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
            console.log(student, course)
            await AssignStudentCourses.create({
                student_id: student,
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

//students who are assigned atleast one course using PURE inner join
exports.getAllAtLeastOneAssginedCourse = async (req, res) => {
    // let a;
    await Student.findAll({
        attributes: ['name'],
        include: [{
            model: AssignStudentCourses,
            as: "students",
            attributes: [],
            required: true
        }],

        // limit:1
    })
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.send({
                message:
                    err.message || "error occured.."
            })
        })

}

//students NAMES who are assigned atleast one course    USING GROUP BY and inner join
exports.getAllAssginedCourses = async (req, res) => {
    // let a;
    await AssignStudentCourses.findAll({
        attributes: [Sequelize.col('students.name')],
        include: [{
            model: Student,
            as: "students",
            attributes: ['name'],
            required: true,
            // distinct:true,
        }],
        group: ['student_id']

        // limit:1
    })
        .then(data => {

            res.status(200).send(data)



        })
        .catch(err => {
            res.send({
                message:
                    err.message || "error occured.."
            })
        })

}

//students not assigned any course using LEFT JOIN
exports.getNonAssignedCoursesStudents = async (req, res) => {

    await Student.findAll({
        attributes: ['name'],
        include: [{
            model: AssignStudentCourses,
            as: "students",
            attributes: []
        }],
        where: {
            '$student_id$': null
        }

    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.statusCode().send(err.message)
        })
}

//students not assigned any course using Right JOIN
exports.getRNonAssignedCoursesStudents = async (req, res) => {

    await AssignStudentCourses.findAll({
        attributes: [],
        include: [{
            model: Student,
            as: "students",
            attributes: ['name'],
            right: true,
        }],
        where: {
            student_id: null
        }

    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.statusCode().send(err.message)
        })
}
//get all students and courses names 
exports.getAllStudentsCoursesNames = async (req, res) => {
    await Course.findAll({
        attributes: ['name'],
        include: [{
            model: AssignStudentCourses,
            as: "course_s",
            attributes: ['student_id'],
            include: [{
                model: Student,
                as: "students",
                attributes: ['name'],
                // right:true
            }]
        }]
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send(err.message)
        })
}

//delete Assign teacher course record
exports.deleteAssignStudentCourse = async (req, res) => {

    let { sid, cid } = req.query;
    let response = {};
    if (sid, cid) {
        await AssignStudentCourses.destroy({
            where: {
                student_id: sid,
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


