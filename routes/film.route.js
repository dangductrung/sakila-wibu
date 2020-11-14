const express = require('express');
const filmModel = require('../models/film.model');

const router = express.Router();

router.get('/', async function (req, res) {
  // console.log(req.accessTokenPayload);
  const list = await filmModel.getAll();
  res.json(list);
})

router.get('/:id', async function (req, res) {
  const id = req.params.id || -1;
  const film = await filmModel.singleById(id);

  if (film === null) {
    return res.status(204).json({});
  }

  res.json(film);
})

const schema = require('../schemas/film.json');
const validation = require('../middleware/validation.mdw');
router.post('/', validation(schema), async function (req, res) {
  const id = await filmModel.add(req.body);
  res.status(201).json({ film_id: id });
})

router.delete('/:id', function (req, res) {

})

router.patch('/:id', function (req, res) {

})

module.exports = router;
