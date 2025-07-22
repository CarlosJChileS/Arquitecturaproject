const courses = require('../domain/courses');

function getAllCourses() {
  return courses;
}

function getCourseById(id) {
  return courses.find(c => c.id === id);
}

function addCourse({ title, description }) {
  const course = { id: courses.length + 1, title, description };
  courses.push(course);
  return course;
}

module.exports = { getAllCourses, getCourseById, addCourse };
