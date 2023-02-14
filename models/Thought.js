const { Schema, model, Types } = require('mongoose')

/* This line of code requires the moment library, which is a popular JavaScript library for working with dates and times. The moment library provides a simple and intuitive API for parsing, validating, manipulating, and formatting dates and times.By requiring the moment library in your code, you'll be able to use its functions to perform a wide range of operations on dates and times, such as parsing dates from strings, formatting dates into strings, and performing arithmetic operations on dates and durations. This can make it easier to work with dates and times in your application and ensure that your code is handling dates and times consistently and correctly. */

const moment = require('moment'); 

// Declare the Reaction Schema of the Mongo model
const reactSchema = new Schema(
  {
    reactId:{
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    reactBody:{
        type:String,
        required:true,
        unique: true,
        maxlength: 300
        
    },
    username:{
        type:String,
        required:true,
        unique:true,
  },
    email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please use a valid email address",
    ],
  },
    password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
      },
      message: "Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one digit, and one special character."
    }
    },
    datecreated: {
      type: Date,
      default: Date.now,
      get: createdate => moment(createdate).format("MMM DD, YYYY [at] hh:mm a"),
    }
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id:false,
  }
  );
  

  
  // Declare the Schema of the Mongo model
  
  const thoughtSchema = new Schema(
    {
      thoughtText:{
        type:String,
        required:true,
        minlength: 1,
        maxlength: 280,
        
      },
      createdate:{
        type:Date,
        default: Date.now,
        get: createdate => moment(createdate).format("MMM DD, YYYY [at] hh:mm a"),
        
      },
      username:{
        type:String,
        required:true,
        
      },
      reactions: [reactSchema],
    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id:false,
      
    },
  );

// Total amount of user friends
const CounterSchema = new Schema({
  count: {
    type: Number,
    default: 0
  }
});

CounterSchema.virtual('incrementedCount').get(function () {
  return this.count + 1;
});

const Counter = model('Counter', CounterSchema);
const Thought = model('Thought', thoughtSchema);




//Export the model
module.exports = Counter;
module.exports = Thought;