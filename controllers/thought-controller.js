const { User, Thought } = require('../models');

const thoughtController = {
  // get all Thoughts
  getAllThought(req, res) {
    Thought.find({})
      // .populate({
      //   path: 'thoughts',
      //   select: '-__v'
      // })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one Thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      // .populate({
      //   path: 'comments',
      //   select: '-__v'
      // })
      .select('-__v')
      .then(dbThoughtData => {
        // If no Thought is found, send 404
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No Thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },


  // createThought
  createThought({ body }, res) {
    Thought.create(body)
      .then(dbThoughtData => {
        User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: dbThoughtData } },
          { new: true }
        ).then(dbThoughtData => res.json(dbThoughtData)).catch(err => {
          console.log(err);
          res.status(400).json({ message: `Invalid UserID` });
        });
      })
  },

  // update Thought by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No Thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

  // delete Thought
  deleteThought({ params }, res) {
    let tempUserData;

    Thought.findOneAndDelete({ _id: params.id })
      .then(dbThoughtData => {

        User.find({
          thoughts: {
            _id: params.id
          }
        }).then(dbUserData => {
          tempUserData = dbUserData;

          User.findOneAndUpdate(
            { _id: tempUserData._id },
            { $pull: { thoughts: params.id } },
            { new: true }
          ).then(dbUserData => res.json(dbThoughtData)).catch(err => {
            console.log(err);
            res.status(400).json({ message: `Invalid ThoughtID` });
          });
        })
      })
      .catch(err => res.status(400).json(err));
  },

  // add new reaction
  createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true }
    ).then(dbThoughtData => {
      if (dbThoughtData === null) {
        res.json({ message: `Invalid ThoughtID` })
      }
      res.json(dbThoughtData)
    }).catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },

  // delete reaction
  deleteReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { _id: body.reactionId } } },
      { new: true }
    ).then(dbUserData => res.json(dbUserData)).catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  }
}


module.exports = thoughtController;