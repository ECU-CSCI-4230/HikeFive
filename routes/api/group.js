const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateGroupInput = require('../../validation/group');
const validateEventInput = require('../../validation/event');
const validateTripInput = require('../../validation/trip');

// Load Group Model
const Group = require('../../models/Group');
const Profile = require('../../models/Profile');
const User = require('../../models/User');


// @route   GET api/group/all
// @desc    Get all groups
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};
  Group.find()
    .then(groups => {
      if (!groups) {
        errors.nogroup = 'There are no groups';
        return res.status(404).json(errors);
      }
      res.json(groups);
    })
    .catch(err => res.status(404).json({ group: 'There are no profiles' }));
});

// @route   GET api/group/search/:query
// @desc    Get all groups where handle or name matches query
// @access  Public

router.get('/search/:query', (req, res) => {
  const errors = {};
  //console.log(req.params);

  Group.find({
    $or: [
      { name: new RegExp(req.params.query, 'i') },
      { handle: new RegExp(req.params.query, 'i') }
    ]
  })
    .then(groups => {
      if (!groups) {
        errors.nogroup = 'No groups were found';
        res.status(404).json(errors);
      }
      //console.log('success');
      //console.log(profiles);
      res.json(groups);
    })
    .catch(err => res.status(404).json(err));
});


// @route   GET api/group/match
// @desc    Get all matching groups
// @access  Public

router.get('/match', (req, res) => {
  const errors = {};

  Group.find({
    $and: [{ skillstatus: { $lte: req.query.skillMax } }, { skillstatus: { $gte: req.query.skillMin } }]
  })
    .then(groups => {
      if (!groups) {
        errors.nogroup = 'No groups were found';
        res.status(404).json(errors);
      }
      //console.log(groups);
      res.json(groups);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/group/matchCombo
// @desc    Get all matching groups
// @access  Public

router.get('/matchCombo', (req, res) => {
  const errors = {};

  Group.find({
    $and: [
      { climber: 'Yes' },
      { camp: 'Yes' },
      { $and: [{ skillstatus: { $lte: req.query.skillMax } }, { skillstatus: { $gte: req.query.skillMin } }] }
    ]
  })
    .then(groups => {
      if (!groups) {
        errors.nogroup = 'No groups were found';
        res.status(404).json(errors);
      }
      //console.log(groups);
      res.json(groups);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/group/matchCamper
// @desc    Get all matching groups
// @access  Public

router.get('/matchCamper', (req, res) => {
  const errors = {};

  Group.find({
    $and: [
      { camp: 'Yes' },
      { $and: [{ skillstatus: { $lte: req.query.skillMax } }, { skillstatus: { $gte: req.query.skillMin } }] }
    ]
  })
    .then(groups => {
      if (!groups) {
        errors.nogroup = 'No groups were found';
        res.status(404).json(errors);
      }
      //console.log(groups);
      res.json(groups);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/group/matchClimber
// @desc    Get all matching groups
// @access  Public

router.get('/matchClimber', (req, res) => {
  const errors = {};

  Group.find({
    $and: [
      { climber: 'Yes' },
      { $and: [{ skillstatus: { $lte: req.query.skillMax } }, { skillstatus: { $gte: req.query.skillMin } }] }
    ]
  })
    .then(groups => {
      if (!groups) {
        errors.nogroup = 'No groups were found';
        res.status(404).json(errors);
      }
      //console.log(groups);
      res.json(groups);
    })
    .catch(err => res.status(404).json(err));
});


// @route   GET api/group/handle/:handle
// @desc    Get group by handle
// @access  Public

router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Group.findOne({ handle: req.params.handle })
    .then(group => {
      if (!group) {
        errors.nogroup = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(group);
    })
    .catch(err => res.status(404).json(err));
});



// @route   POST api/group
// @desc    Create group 
// @access  Private
router.post(
  '/', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateGroupInput(req.body);
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    //console.log('here');
    // Get fields
    const groupFields = {};
    if (req.body.handle) groupFields.handle = req.body.handle;
    if (req.body.name) groupFields.name = req.body.name;
    if (req.body.avatar) groupFields.avatar = req.body.avatar;
    if (req.body.background) groupFields.background = req.body.background;
    if (req.body.zip) groupFields.zip = req.body.zip;
    if (req.body.skillstatus) groupFields.skillstatus = req.body.skillstatus;
    if (req.body.climber) groupFields.climber = req.body.climber;
    if (req.body.travel) groupFields.travel = req.body.travel;
    if (req.body.camp) groupFields.camp = req.body.camp;
    if (req.body.bio) groupFields.bio = req.body.bio;
    if (req.body.ownerid) groupFields.ownerid = req.body.ownerid;
    // Social
    groupFields.social = {};
    if (req.body.youtube) groupFields.social.youtube = req.body.youtube;
    if (req.body.twitter) groupFields.social.twitter = req.body.twitter;
    if (req.body.facebook) groupFields.social.facebook = req.body.facebook;
    if (req.body.instagram) groupFields.social.instagram = req.body.instagram;

    // Check if handle exists
    Group.findOne({ handle: groupFields.handle }).then(group => {
      //console.log(group);
      if (group) {
        errors.handle = 'That handle already exists';
        res.status(400).json(errors);
      }

      // Save Group
      console.log("Group created");
      const temp = new Group(groupFields);
      temp.save((error) => {
        if (error) {
          console.log('Error has occurred');
        }
      });

    });
  }
);

// @route   POST api/group/edit
// @desc    Create group 
// @access  Private
router.post(
  '/edit', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateGroupInput(req.body);
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    //console.log('here');
    // Get fields
    const groupFields = {};
    if (req.body.handle) groupFields.handle = req.body.handle;
    if (req.body.name) groupFields.name = req.body.name;
    if (req.body.avatar) groupFields.avatar = req.body.avatar;
    if (req.body.background) groupFields.background = req.body.background;
    if (req.body.zip) groupFields.zip = req.body.zip;
    if (req.body.skillstatus) groupFields.skillstatus = req.body.skillstatus;
    if (req.body.climber) groupFields.climber = req.body.climber;
    if (req.body.travel) groupFields.travel = req.body.travel;
    if (req.body.camp) groupFields.camp = req.body.camp;
    if (req.body.bio) groupFields.bio = req.body.bio;
    // Social
    groupFields.social = {};
    if (req.body.youtube) groupFields.social.youtube = req.body.youtube;
    if (req.body.twitter) groupFields.social.twitter = req.body.twitter;
    if (req.body.facebook) groupFields.social.facebook = req.body.facebook;
    if (req.body.instagram) groupFields.social.instagram = req.body.instagram;

    Group.findOne({ handle: groupFields.handle }).then(group => {
      if (group) {
        // Update
        Group.findOneAndUpdate(
          { handle: groupFields.handle },
          { $set: groupFields },
          { new: true }
        ).then(group => res.json(group));
      }
    });
  }
);



// @route   POST api/group/trips
// @desc    Add trip to group
// @access  Private
router.post(
  '/trips',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTripInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Group.findOne({ handle: req.body.handle }).then(group => {
      const newTrip = {
        name: req.body.name,
        date: req.body.date,
        location: req.body.location,
        description: req.body.description,
        difficulty: req.body.difficulty,
      };

      // Add to trip array
      group.trip.unshift(newTrip);

      group.save().then(group => res.json(group));
    });
  }
);

// @route   POST api/group/events
// @desc    Add event to group
// @access  Private
router.post(
  '/events',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEventInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Group.findOne({ handle: req.body.handle }).then(group => {
      const newEvent = {
        name: req.body.name,
        start: req.body.start,
        end: req.body.end,
        location: req.body.location,
        description: req.body.description,
      };

      // Add to trip array
      group.events.unshift(newEvent);

      group.save().then(group => res.json(group));
    });
  }
);

/*

// @route   GET api/group/events/:start
// @desc    Get event by start
// @access  Public

router.get('/events/:event_start', (req, res) => {
  const errors = {};

  Group.findOne({ start: req.params.start })
    .then(event => {
      if (!event) {
        errors.noevent = 'There is no event for this starting date';
        res.status(404).json(errors);
      }

      res.json(event);
    })
    .catch(err => res.status(404).json(err));
});

*/




// @route   DELETE api/group/trips/:trip_id
// @desc    Delete trip from group
// @access  Private
router.delete(
  '/trips/:trip_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Group.findOne({ handle: req.query.handle })
      .then(group => {
        // Get remove index
        const removeIndex = group.trip
          .map(item => item.id)
          .indexOf(req.params.trip_id);

        // Splice out of array
        group.trip.splice(removeIndex, 1);

        // Save
        group.save().then(group => res.json(group));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/group/events/:event_id
// @desc    Delete event from group
// @access  Private
router.delete(
  '/events/:event_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Group.findOne({ handle: req.query.handle })
      .then(group => {
        // Get remove index
        const removeIndex = group.events
          .map(item => item.id)
          .indexOf(req.params.events_id);

        // Splice out of array
        group.events.splice(removeIndex, 1);

        // Save
        group.save().then(group => res.json(group));
      })
      .catch(err => res.status(404).json(err));
  }
);




// @route   DELETE api/group
// @desc    Delete group
// @access  Private
router.delete(
  '/:id',
  (req, res) => {
    { console.log(req.params.id) }
    Group.findOneAndRemove({ _id: req.params.id }).then(() => {
      res.json({ success: true })
    });
  }
);


// @route   GET api/group/events
// @desc    Get event by id
// @access  Public

router.get('/events', (req, res) => {
  //console.log("SERVER SIDE OF EVENTS");
  //console.log(req.query.eventid);
  //{events: {$elemMatch: {name:"NewEvent"}}}
  Group.find({events: {$elemMatch: {name:"NewEvent"}}}).then(event => {
      //console.log("IT WORKS");
      console.log(event[0].events);
      if (!event) {
        errors.noevent = 'There is no event for this id';
        res.status(404).json(errors);
      }

      res.json(event);
    })

    .catch(err => res.status(404).json(err));
});




// @route   POST api/group/addmember
// @desc    Join group
// @access  Private
router.post(
  '/addmember',
  (req, res) => {
    //userId, groupHandle
    Group.findOne({ handle: req.body.groupHandle }).then(group => {
    const userID = {ids: req.body.userId};

    if(group.ownerid == req.body.userId)
    {console.log("member already exists");return res.status(400);}
    var arrayLength = group.teammember.length;
    for (var i = 0; i < arrayLength; i++) {
      if(group.teammember[i].ids == req.body.userId)
      {
        console.log("member already exists"); 
        return res.status(400);
      }
    }

    // Add to teammember array
    group.teammember.unshift(userID);
    group.save();
    });
  }
);

// @route   GET api/group/members
// @desc    Get group members
// @access  Public
router.post('/members', (req, res) => {
  //console.log(req.body.ids);
  //["5ca56bca5abf24403868f69a","5c9154f0416bc437447befa6"]
  console.log("THIS IS MEMBERS");
  Profile.find({_id: {$in: req.body.ids}})
  .populate('user', ['name', 'avatar'])
  .then(members=>{
    if (!members) {
      errors.nogroup = 'There are no members';
      return res.status(404).json(errors);
    }
    //console.log(members);
    res.json(members);
  })
  .catch(err => res.status(404).json(err));
  /*
  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles';
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
    */
});

module.exports = router;
