const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { validateTask } = require('../middleware/validationMiddleware');
const {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
} = require('../controllers/taskController');

// @route   GET api/tasks
// @desc    Get all user tasks
// @access  Private
router.get('/', auth, getTasks);

// @route   POST api/tasks
// @desc    Create a task
// @access  Private
router.post('/', [auth, validateTask], createTask);

// @route   PUT api/tasks/:id
// @desc    Update a task
// @access  Private
router.put('/:id', [auth, validateTask], updateTask);

// @route   DELETE api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', auth, deleteTask);

module.exports = router;
