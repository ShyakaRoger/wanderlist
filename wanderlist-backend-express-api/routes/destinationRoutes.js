const express = require('express');
const router = express.Router();
const Destination = require('../models/destination');
const verifyToken = require('../middlewares/authMiddleware');

// PUBLIC: Get only destinations marked as public (for Explore & Home pages)
router.get('/public', async (req, res) => {
  try {
    const destinations = await Destination.find({ public: true })
      .populate('user', 'username'); // Include creator's username
    res.json(destinations);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Get ALL destinations (public or not) 
router.get('/public-all', async (req, res) => {
  try {
    const destinations = await Destination.find()
      .populate('user', 'username');
    res.json(destinations);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// PROTECTED: Get all destinations for the logged-in user
router.get('/', verifyToken, async (req, res) => {
  try {
    const destinations = await Destination.find({ user: req.user.id });
    res.json(destinations);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// PROTECTED: Get a single destination by ID (any logged-in user can view)
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id)
      .populate('user', 'username');

    if (!destination) {
      return res.status(404).json({ err: 'Trip not found' });
    }

    res.json(destination);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// PROTECTED: Create a new destination
router.post('/', verifyToken, async (req, res) => {
  try {
    const newDestination = new Destination({
      ...req.body,
      user: req.user.id
    });

    await newDestination.save();
    res.status(201).json(newDestination);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// PROTECTED: Update a destination (only by the owner)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({ err: 'Destination not found' });
    }

    if (destination.user.toString() !== req.user.id) {
      return res.status(403).json({ err: 'Access denied' });
    }

    const updated = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// PROTECTED: Delete a destination (only by the owner)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({ err: 'Destination not found' });
    }

    if (destination.user.toString() !== req.user.id) {
      return res.status(403).json({ err: 'Unauthorized to delete this destination' });
    }

    await Destination.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('DELETE ERROR:', err.message);
    res.status(500).json({ err: 'Server error during delete' });
  }
});

module.exports = router;
