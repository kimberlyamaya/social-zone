const { Schema, model } = require('mongoose');
const validator = require("validator");

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
            validator: validator.isEmail,
            mesesage: "{VALUE} is not a valid email",
            isAsync: false        
        }
        // validate: {
        //     validator: () => Promise.resolve(false),
        //     message: 'Email validation failed'
        // }
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: "Thought"
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]

  },
  {
      toJSON: {
        virtuals: true,
      },
      id: false
  }
)

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;