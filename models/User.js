const { Schema, model, Types } = require('mongoose');


// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema(
  {
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,

    // This piece of code is a regular expression that is used to match a string to a valid email format.
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please use a valid email address",
    ],
  },

  // This code defines a MongoDB schema property for a Mongoose model in a Node.js application. The property "comments" is an array of objects, where each object has a single property "type" with a value of Schema.Types.ObjectId and a single property "ref" with a value of "Thought".

  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thought",
    },
  ],
  
  friends: [
    {
    type: Schema.Types.ObjectId,
    ref: "User",
     },
  ],
},
{
    toJson: {
      virtuals: true,
    },
    id: false,
  
    
});

userSchema.virtual("fCount").get(function () {
  return this.friends.length;
})


//Export the model
module.exports = mongoose.model('User', userSchema);

