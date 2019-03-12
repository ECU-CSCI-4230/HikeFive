const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const GroupSchema = new Schema({
  
  handle: {
    type: String,
    required: true,
    max: 40
  },
  name: {
    type: String,
    required: true,
    max: 75
  },
  avatar: {
    type: String
  },
  zip: {
    type: String
  },
  skillstatus: {
    type: String,
    required: true
  },
  climber: {
    type: String,
    required: true
  },
  travel: {
    type:String,
    required:true
  },
  camp:{
    type:String,
    required:true
  },
  bio: {
    type: String
  },
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Group = mongoose.model('group', GroupSchema);
