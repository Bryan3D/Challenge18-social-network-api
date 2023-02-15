const { Schema, model, Types } = require('mongoose');


// Declare the Schema of the Mongo model
const userSchema = new Schema(
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
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/, 'Please fill a valid email address']
    
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

const User = model('User', userSchema);

//Export the model
module.exports = User;

