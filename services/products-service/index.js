const express = require('express');
const app = express();
app.use(express.json());

const router = express.Router();

// In-memory courses store for demo with some seeded data
const courses = [
  {
    id: 1,
    title: 'JavaScript Moderno: ES6+',
    description:
      'Aprende las características más recientes de JavaScript incluyendo ES6, ES7 y más allá.'
  },
  {
    id: 2,
    title: 'React Avanzado',
    description:
      'Domina React con hooks, context, suspense y las mejores prácticas de desarrollo.'
  },
  {
    id: 3,
    title: 'Node.js y Express',
    description: 'Desarrolla APIs robustas y aplicaciones backend con Node.js y Express.'
  }
];

// List courses
router.get('/', (req, res) => {
  res.json(courses);
});

// Retrieve a single course by id
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const course = courses.find(c => c.id === id);
  if (!course) {
    return res.status(404).json({ error: 'Course not found' });
  }
  res.json(course);
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
