const express = require('express');
const router = express.Router();

// In-memory courses store for demo
const courses = [];

// List courses
router.get('/', (req, res) => {
  res.json(courses);
});

// Create a new course
router.post('/', (req, res) => {
  const { title, description } = req.body;
  const course = { id: courses.length + 1, title, description };
  courses.push(course);
  res.status(201).json(course);
});

module.exports = router;
