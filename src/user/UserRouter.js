const express = require('express');
const User = require('./User');
const UserNotFoundException = require('./UserNotFoundException');
const router = express.Router();
const pagination = require('../shared/pagination');
const idNumberControl = require('../shared/idNumberControl');
const UserService = require('./UserService');
const { body, validationResult } = require('express-validator');
const ValidationException = require('../shared/ValidationException');

router.post('/users', 
body('username')
  .notEmpty().withMessage('Username cannot be null')
  .bail()
  .isLength({min: 4, max: 32}).withMessage('Username must have min 4 max 32 characters'),
body('email')
  .isEmail().withMessage('Must be a valid e-mail address')
  .bail()
  .custom(async (email) => {
    const user = await UserService.findByEmail(email)
    if(user){
      throw new Error('Email in use');
    }
  })
  ,
async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return next(new ValidationException(errors.array()));
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