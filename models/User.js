const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: () => Promise.resolve(false),
            message: 'Email validation failed'
        }
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: Thought
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: User
    }]

  },
  {
      toJSON: {
        virtuals: true,
      },
      id: false
  }
)

// get total count of comments and replies on retrieval
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// create the Pizza model using the PizzaSchema
const User = model('User', UserSchema);

// export the Pizza model
module.exports = User;