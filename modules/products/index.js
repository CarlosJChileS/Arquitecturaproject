const express = require('express');
const router = express.Router();
const {
  getAllCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse
} = require('../../core/application/coursesService');

router.get('/', async (req, res) => {
  try {
    const courses = await getAllCourses();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const course = await getCourseById(parseInt(req.params.id, 10));
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    const course = await addCourse({ title, description });
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const course = await updateCourse(parseInt(req.params.id, 10), req.body);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const success = await deleteCourse(parseInt(req.params.id, 10));
    if (!success) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
