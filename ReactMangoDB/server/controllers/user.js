const mongoose = require('mongoose');
const { Router } = require('express');

const User = mongoose.model('User');

const router = Router();

module.exports = router;

/**
 * create a user
 */
router.post('/', async function (req, res) {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (err) {
    // error
    console.error(err);
    res.sendStatus(500);
  }
});

/**
 * get all users
 */
router.get('/', async function (req, res) {
  try {
    res.json(await User.find(req.query));
  } catch (err) {
    // error
    console.error(err);
    res.sendStatus(500);
  }
});
