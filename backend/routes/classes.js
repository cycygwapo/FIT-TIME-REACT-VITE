const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Class = require('../models/classModel');

// Create a new class
router.post('/', auth, async (req, res) => {
  try {
    const { category, exerciseType, date, time, place } = req.body;
    
    // Validate required fields
    if (!category || !exerciseType || !date || !time || !place) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    const newClass = new Class({
      instructor: req.user.id,
      instructorName: req.user.name,
      category,
      exerciseType,
      date,
      time,
      place
    });

    await newClass.save();

    res.status(201).json({
      success: true,
      message: 'Class created successfully',
      class: newClass
    });
  } catch (error) {
    console.error('Error creating class:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create class'
    });
  }
});

// Get all classes
router.get('/', async (req, res) => {
  try {
    const classes = await Class.find().populate('instructor', 'name');
    res.json({
      success: true,
      classes
    });
  } catch (error) {
    console.error('Error fetching classes:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching classes'
    });
  }
});

// Update a class
router.put('/:id', auth, async (req, res) => {
  try {
    const { category, exerciseType, date, time, place } = req.body;
    
    // Validate required fields
    if (!category || !exerciseType || !date || !time || !place) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      {
        category,
        exerciseType,
        date,
        time,
        place
      },
      { new: true }
    );

    if (!updatedClass) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }

    res.json({
      success: true,
      message: 'Class updated successfully',
      class: updatedClass
    });
  } catch (error) {
    console.error('Error updating class:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update class'
    });
  }
});

// Delete a class
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    
    if (!deletedClass) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }

    res.json({
      success: true,
      message: 'Class deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting class:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting class'
    });
  }
});

module.exports = router;
