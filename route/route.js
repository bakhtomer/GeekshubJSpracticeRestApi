// requires express for routing 

const express = require('express');
const route = express.Router();
const courseController = require('../controler/courseController')

//Courses routes

//create new course
route.post('/courses', courseController.createNewCourse)
//Get all courses
route.get('/courses', courseController.getAllCourses)
//Get course for specific id
route.get('/courses/:id', courseController.getCourseById)
//Update course by id
route.put('/courses/:id', courseController.updateCourse)
//delete all courses
route.delete('/courses/all', courseController.deleteAllCourses)
//delete course by id
route.delete('/courses/:id', courseController.deleteCourseById)



//teacher routes
const teacherController=require('../controler/teacherController')
//get all teachers
route.get('/teachers',teacherController.getAllTeachers)
//get teacher by id
route.get('/teachers/:id',teacherController.getTeacherById)
// create new teacher
route.post('/teachers',teacherController.createNewTeacher)
//update teacher
route.put('/teachers/:id',teacherController.updateTeacher)
//delete all teachers
route.delete('/teachers/all',teacherController.deleteAllTeachers)
//delete teacher
route.delete('/teachers/:id',teacherController.deleteOneTeacher)



//Students routes
const studentController=require('../controler/studentController');
// const { assign_teacher_course } = require('../controler/assign_teacher_courses_controler');
//get all teachers
route.get('/students',studentController.getAllStudents)
//get student by id
route.get('/students/:id',studentController.getStudentById)
// create new student
route.post('/students',studentController.createNewStudent)
//update student
route.put('/students/:id',studentController.updateStudent)
//delete all teachers
route.delete('/students/all',studentController.deleteAllStudents)
//delete student
route.delete('/students/:id',studentController.deleteOneStudent)



// Assign teacher routes
const assignTeacherCourseController=require('../controler/assignTeacherCoursesControler')
// Assign teachers courses creating
route.post('/assignTeacherCourses',assignTeacherCourseController.assignTeacherCourse)
//Get all teachers and caourse names assigned to them
// Delete Assign teachers courses creating
route.delete('/assignTeacherCourses',assignTeacherCourseController.deleteAssignTeacherCourse)
route.get('/allTeachersAndCoursesName',assignTeacherCourseController.getAllTeachersAndCoursesNames)
// Get All teachers and number of courses assigned to them
route.get('/allTeachersAndNumberCourses',assignTeacherCourseController.getTeachersAndNoCoursesAssigned)
// update assign student courses
// route.put('/assign_teacher_courses',assignTeacherCourseController.update)



//Assign student courses
const assignStudentCourseController=require('../controler/assignStudentCoursesControler')
// Assign students courses creating new assignment
route.post('/assignStudentCourses',assignStudentCourseController.assignStudentCourse)
//Get students who are assigned courses
route.get('/assignStudentCourses',assignStudentCourseController.getAllAssginedCourses)
// Get students who are not assigned any courses
route.get('/notAssignStudentCourses',assignStudentCourseController.getNonAssignedCoursesStudents)
// Get all courses names and students assigned to them
route.get('/allStudentsCoursesName',assignStudentCourseController.getAllStudentsCoursesNames)
// Delete assign student courses
route.delete('/assignStudentCourses',assignStudentCourseController.deleteAssignStudentCourse)
// route.get('/get_student_no_course',studentController.get_all_students_not_assigned_courses)


module.exports = route;