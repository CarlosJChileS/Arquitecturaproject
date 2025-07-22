const express = require('express');
const router = express.Router();
const {
  getAllCourses,
  getCourseById,
  addCourse
} = require('../../core/application/coursesService');

router.get('/', (req, res) => {
  res.json(getAllCourses());
});

router.get('/:id', (req, res) => {
  const course = getCourseById(parseInt(req.params.id, 10));
  if (!course) {
    return res.status(404).json({ error: 'Course not found' });
  }
  res.json(course);
});

router.post('/', (req, res) => {
  const { title, description } = req.body;
  const course = addCourse({ title, description });
  res.status(201).json(course);
});

module.exports = router;
