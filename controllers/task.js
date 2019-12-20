const models = require('../models');

module.exports = {
  get: (req, res, next) => {
      models.Task.find().populate('author').sort({ _id: -1 })
        .then((tasks) => res.send(tasks))
        .catch(next);
      return;
  },

  post: (req, res, next) => {
    const {title, levelRequired, difficulty, expiriance, description } = req.body;
    const { _id } = req.user;

    models.Task.create({title, levelRequired, difficulty, expiriance, description, author: _id })
      .then((createdTask) => {
        return Promise.all([
          models.User.updateOne({ _id }, { $push: { tasksCreated: createdTask } }),
          models.Task.findOne({ _id: createdTask._id })
        ]);
      })
      .then(([modifiedObj, taskObj]) => {
        res.send(taskObj);
      })
      .catch(next);
  },

  put: (req, res, next) => {
    const id = req.params.id;
    const { description } = req.body;
    models.Task.updateOne({ _id: id }, { description })
      .then((updatedTask) => res.send(updatedTask))
      .catch(next)
  },
  
  updateExp:(req, res, next) => {
    const id = req.params.id;
    const { username, password } = req.body;
    models.User.update({ _id: id }, { username, password })
      .then((updatedUser) => res.send(updatedUser))
      .catch(next)
  },

  delete: (req, res, next) => {
    const id = req.params.id;
    models.Task.deleteOne({ _id: id })
      .then((removedTask) => res.send(removedTask))
      .catch(next)
  }
};