const express = require('express');
const actorModel = require('../models/actor.model');

const router = express.Router();

router.get('/', async function (req, res) {
  const page = req.query.page;
  const limit = req.query.limit;

  if (page) {
    let list = await actorModel.getAll();
    res.json({
      payload: list.slice((page - 1) * limit, limit * page),
      size: list.length
    })
  }
  else {
    const list = await actorModel.getAll();
    res.json(list);
  }
})

router.get('/:id', async function (req, res) {
  const id = req.params.id || -1;
  const actor = await actorModel.singleById(id);

  if (actor === null) {
    return res.json("Actor don't exist or be deleted")
  }
  res.status(200).json(actor);
})

const schema = require('../schemas/actor.json');
const validation = require('../middleware/validation.mdw');
router.post('/', validation(schema), async function (req, res) {
  const id = await actorModel.add(req.body);
  res.status(201).json({ actor_id: id });
})

router.delete('/:id', async function (req, res) {
  const id = req.params.id || -1;
  const rs = await actorModel.delete(id);
  console.log(id);
  if (rs) {
    return res.status(200).json("success");
  }
  return res.status(400).json("Actor don't exist or be deleted");
})

router.patch('/:id', validation(schema), async function (req, res) {
  const id = req.params.id || -1;
  const rs = await actorModel.update(id, req.body);

  if (rs) {
    return res.status(200).json("success");
  }
  return res.status(400).json("Actor don't exist or be deleted");
})

module.exports = router;
