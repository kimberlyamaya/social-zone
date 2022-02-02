const { Thought, User } = require('../models');

const thoughtController = {
  // the functions will go in here as methods
    // get all thoughts
    getAllThought(req, res) {
        Thought.find({})
          .populate({
            path: "reactions", 
            select: "-__v"})
          .select("-__v")
          .sort({ _id: -1 })
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },
    
      // get one thought by id
      getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
          .populate({
            path: "reactions", 
            select: "-__v"})
          .select("-__v")
          .then(dbThoughtData => {
            // If no thought is found, send 404
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No thought found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },

      // create Thought
      createThought({ params, body }, res) {
      Thought.create(body)
        .then (({_id}) => {
            return User.findOneAndUpdate(
              { _id: body.userId}, 
              {$push: {thought: _id}}, 
              {new: true})
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => res.status(400).json(err));
      },

      // update thought by id
      updateThought({ params, body }, res) {
      Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .populate({
          path: "reactions", 
          select: "-__v"})
        .select("-__v")
        .then(dbThoughtData => {
          if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
          }
        res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
      },

      // delete Thought
      deleteThought({ params }, res) {
      Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => {
          if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
      }
};

module.exports = thoughtController;