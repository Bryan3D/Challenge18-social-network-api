const { Schema } = require('mongoose');
const data = require('../utils/date');


// Declare the Schema of the Mongo model
const reactionSchema = new Schema({
  // set custom id to avoid confusion with parent id
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  }
},
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

module.exports = reactionSchema;