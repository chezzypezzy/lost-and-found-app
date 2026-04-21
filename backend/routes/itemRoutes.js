const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Item = require('../models/Item');

// @route   POST api/items
// @desc    Create an item (Lost or Found)
// @access  Private (Must be logged in)
router.post('/', auth, async (req, res) => {
  try {
    const { title, category, type, description, location, contactInfo, image } = req.body;
    const newItem = new Item({
      user: req.user.id, // Comes from the auth middleware
      title,
      category,
      type,
      description,
      location,
      contactInfo,
      image
    });
    const item = await newItem.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/items
// @desc    Get all items
// @access  Public
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({ date: -1 }).populate('user', 'name email');
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/items/:id
// @desc    Get item by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('user', 'name email');
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Item not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/items/:id
// @desc    Update item status (e.g., mark as returned)
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    let item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }
    if (item.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    item.status = req.body.status || 'active';
    await item.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/items/:id
// @desc    Delete an item
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Item not found' });
    if (item.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });
    await item.deleteOne();
    res.json({ msg: 'Item removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;