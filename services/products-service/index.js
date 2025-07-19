const express = require('express');
const app = express();
app.use(express.json());

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

app.use('/', router);

if (require.main === module) {
  const PORT = process.env.PORT || 3004;
  app.listen(PORT, () => {
    console.log(`Products service running on port ${PORT}`);
  });
}

module.exports = router;
