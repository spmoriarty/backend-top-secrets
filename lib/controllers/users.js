// const authorize = require('../middleware/authorize');
// const User = require('../models/User');

const UserService = require('../services/UserService');
const { Router } = require('express');

// const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);
      res.json(user);
    } catch(e) {
      next(e);
    }
  });
