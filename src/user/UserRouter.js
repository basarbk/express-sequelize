const express = require('express');
const User = require('./User');
const UserNotFoundException = require('./UserNotFoundException');
const router = express.Router();
const pagination = require('../shared/pagination');
const idNumberControl = require('../shared/idNumberControl');
const UserService = require('./UserService');
const { body, validationResult } = require('express-validator');

router.post('/users', body('username').notEmpty(), async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.send(errors.array());
    }
  await UserService.create(req.body);
  res.send("success");
})

router.get('/users', pagination, async (req, res) => {
  const page = await UserService.getUsers(req.pagination);
  res.send(page);
})


router.get('/users/:id', idNumberControl, async (req, res, next) => {
  try {
    const user = await UserService.getUser(req.params.id);
    res.send(user);
  } catch (err) {
    next(err);
  }
})

router.put('/users/:id', idNumberControl, async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({where: {id: id}});
  user.username = req.body.username;
  await user.save();
  res.send('updated');
})

router.delete('/users/:id', idNumberControl, async (req, res) => {
  const id = req.params.id;
  await User.destroy({where: {id: id}});
  res.send('removed');
})

module.exports = router;