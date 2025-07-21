const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.get('/items', async (req, res) => {
  try {
    const items = await db.getAllItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/items/:id', async (req, res) => {
  try {
    const item = await db.getItemById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/items', async (req, res) => {
  try {
    const { name, description } = req.body;
    const id = await db.createItem(name, description);
    res.status(201).json({ id, name, description });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/items/:id', async (req, res) => {
  try {
    const { name, description } = req.body;
    await db.updateItem(req.params.id, name, description);
    res.json({ id: req.params.id, name, description });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/items/:id', async (req, res) => {
  try {
    await db.deleteItem(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;