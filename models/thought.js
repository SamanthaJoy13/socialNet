const mongoose = require('mongoose');

const { Schema } = mongoose;

const reactionSchema = new Schema(

  {

    reactionBody: {

      type: String,
      required: true,
      maxlength: 280

    },

    username: {

      type: String,
      required: true

    },

    createdAt: {

      type: Date,
      default: Date.now,
      get: (createdAt) => createdAt.toLocaleString()

    }

  },

  {

    toJSON: { getters: true } 
  }

);

const thoughtSchema = new Schema({

  thoughtText: {

    type: String,
    required: true,
    minlength: 1,
    maxlength: 280

  },

  createdAt: {

    type: Date,
    default: Date.now,
    get: (createdAt) => createdAt.toLocaleString()
    
  },

  username: {

    type: String,
    required: true

  },

  reactions: [reactionSchema]

});


thoughtSchema.virtual('reactionCount').get(function () {

  return this.reactions.length;
  
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;