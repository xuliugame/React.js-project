const mongoose = require('mongoose');
const { Router } = require('express');
const Bug = mongoose.model('Bug');

const router = Router();

module.exports = router;

/**
 * create a bug
 */
router.post('/', async function (req, res) {
  try {
    const doc = new Bug(req.body);
    await doc.save();
    res.json(doc);
  } catch (err) {
    // error
    console.error(err);
    res.sendStatus(500);
  }
});

/**
 * get single bug
 */
router.get('/:id', async function (req, res) {
  try {
    const bug = await Bug.findById(req.params.id).populate('Assignee');
    if (bug) {
      res.json(bug);
    } else {
      // not found
      res.sendStatus(404);
    }
  } catch (err) {
    // error
    console.error(err);
    res.sendStatus(500);
  }
});

/**
 * get all bugs
 */
router.get('/', async function (req, res) {
  try {
    res.json(await Bug.find().populate('Assignee'));
  } catch (err) {
    // error
    console.error(err);
    res.sendStatus(500);
  }
});

/**
 * update a bug by id
 */
router.put('/:id', async function (req, res) {
  const bug = await Bug.findById(req.params.id).populate('Assignee');
  if (bug) {
    try {
      res.json(await Bug.findByIdAndUpdate(req.params.id, req.body, { new: true }));
    } catch (err) {
      // error
      console.error(err);
      res.sendStatus(500);
    }
  } else {
    // not found
    res.sendStatus(404);
  }
});

/**
 * delete a bug by if
 */
router.delete('/:id', async function (req, res) {
  const bug = await Bug.findById(req.params.id).populate('Assignee');
  if (bug) {
    try {
      res.json(await Bug.findByIdAndRemove(req.params.id));
    } catch (err) {
      // error
      console.error(err);
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(404);
  }
});