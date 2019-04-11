const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  avatar: {
    type: String
  },
  background: {
    type: String
  },
  zip: {
    type: String
  },
  country: {
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
    type: String,
    required: true
  },
  camp: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },

  trip: [{
    name: {
      type: String,
      required: true
    },
    date: {
      type: Date,
    },
    location: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    difficulty: {
      type: String,
    }
  }],
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
ProfileSchema.index({
  handle: 'text',
  user: 'text'
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);