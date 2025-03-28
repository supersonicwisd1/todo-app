const express = require('express');
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const { taskValidation } = require('../middleware/validateMiddleware');

const router = express.Router();

// Protect all routes in this router
router.use(protect);

// Route definitions
router.route('/')
  .get(getTasks)
  .post(taskValidation, createTask);

router.route('/:id')
  .get(getTask)
  .put(taskValidation, updateTask)
  .delete(deleteTask);

module.exports = router;