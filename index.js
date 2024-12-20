const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swaggerConfig');

// Serve Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Other app configurations
app.use(bodyParser.json());


// Create a new student
app.post('/students', async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const student = await prisma.student.create({
      data: { name, email, age },
    });
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: 'Error creating student', details: error });
  }
});


// Read all students
app.get('/students', async (req, res) => {
    const students = await prisma.student.findMany();
    res.status(200).json(students);
  });
  
// Read a single student by ID
app.get('/students/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const student = await prisma.student.findUnique({ where: { id: Number(id) } });
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Error fetching student', details: error });
  }
});


// Update a student
app.put('/students/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    const student = await prisma.student.update({
      where: { id: Number(id) },
      data: { name, email, age },
    });
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: 'Error updating student', details: error });
  }
});


// Delete a student
app.delete('/students/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.student.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Error deleting student', details: error });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
