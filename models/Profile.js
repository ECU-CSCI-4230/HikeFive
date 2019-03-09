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
  gender: {
    type:String,
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

  trip: [
    {
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
    }
  ],
  //This needs to be deleted
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  //This needs to be deleted
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
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
ProfileSchema.index({handle: 'text'});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
