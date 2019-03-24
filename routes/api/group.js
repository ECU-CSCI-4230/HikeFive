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


// @route   GET api/group/event/:event_id
// @desc    Get specific event for group
// @access  Public

router.get('/event/:event_id', (req, res) => {
  const errors = {};

  Group.find({ _id: req.params.id }, { events: { $elemMatch: { _id: req.params.event_id}}})
  .then(event => {
    if (!event) {
      errors.noevent = 'There is no event matching query';
      res.status(404).json(errors);
    }
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

    // Check if handle exists
    Group.findOne({ handle: groupFields.handle }).then(group => {
      //console.log(group);
      if (group) {
        errors.handle = 'That handle already exists';
        res.status(400).json(errors);
      }
      else {
        // Save Group
        const temp = new Group(groupFields);
        temp.save((error) => {
          if (error) {
            console.log('Error has occurred');
          }
        });
      }
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

// @route   POST api/group/event
// @desc    Add event to group
// @access  Private
router.post(
  '/event',
  //authentication here
  (req, res) => {
    //const { errors, isValid } = validateEventInput(req.body);
    //check valid input
    //if(!isValid) {
    //  return res.status(400).json(errors);
    //}
  console.log(req.user);
    Group.findOne({ handle: req.body.handle }).then(group => {
      const newEvent = {
        name: req.body.name,
        start: req.body.start,
        end: req.body.end,
        location: req.body.location,
        info: req.body.info,
      };
      //Add event to events array
      group.events.unshift(newEvent);
      group.save().then(group => res.json(group));
    });
  }
);

// @route   DELETE api/group/event/:event_id
// @desc    Delete trip from group
// @access  Private
router.delete(
  '/event/:event_id',
  //passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Group.findOne({ _id: req.group.id })
      .then(group => {
        // Get remove index
        const removeIndex = group.events
          .map(item => item.id)
          .indexOf(req.params.event_id);

        // Splice out of array
        group.events.splice(removeIndex, 1);

        // Save
        group.save().then(group => res.json(group));
      })
      .catch(err => res.status(404).json(err));
  }
);


// @route   POST api/profile/trips
// @desc    Add trip to profile
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

// @route   DELETE api/profile/trips/:trip_id
// @desc    Delete trip from profile
// @access  Private
router.delete(
  '/trips/:trip_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Group.findOne({ handle: req.params.handle })
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

// @route   DELETE api/group
// @desc    Delete group
// @access  Private
router.delete(
  '/:id',
  (req, res) => {
    {console.log(req.params.id)}
    Group.findOneAndRemove({ _id: req.params.id }).then(() => {
      res.json({ success: true })
    });
  }
);

module.exports = router;
