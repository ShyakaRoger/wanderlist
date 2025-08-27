const express = require('express');
const router = express.Router();
const Explore = require('../models/explore');

// GET /api/explore
// Get all explore items (public trips)

router.get('/', async (req, res) => {
  try {
    const explores = await Explore.find(); // You can add `.populate('user tags')` if needed
    res.status(200).json(explores);
  } catch (err) {
    res.status(500).json({ err: 'Failed to fetch explore items' });
  }
});

//GET /api/explore/:id
//Get a single explore item by ID

router.get('/:id', async (req, res) => {
  try {
    const explore = await Explore.findById(req.params.id);
    if (!explore) {
      return res.status(404).json({ err: 'Trip not found' });
    }
    res.status(200).json(explore);
  } catch (err) {
    res.status(500).json({ err: 'Error fetching the trip' });
  }
});

// POST /api/explore
// Create a new explore item
router.post('/', async (req, res) => {
  try {
    const newExplore = await Explore.create(req.body);
    res.status(201).json(newExplore);
  } catch (err) {
    res.status(500).json({ err: 'Error creating trip' });
  }
});

// PUT /api/explore/:id
// Update an explore item by ID

router.put('/:id', async (req, res) => {
  try {
    const updated = await Explore.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updated) {
      return res.status(404).json({ err: 'Trip not found for update' });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ err: 'Error updating trip' });
  }
});

// DELETE /api/explore/:id
// Delete an explore item by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Explore.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ err: 'Trip not found for deletion' });
    }
    res.status(200).json({ msg: 'Trip deleted successfully' });
  } catch (err) {
    res.status(500).json({ err: 'Error deleting trip' });
  }
});

module.exports = router;
