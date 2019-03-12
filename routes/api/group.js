const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateGroupInput = require('../../validation/group');

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
    if (req.body.zip) groupFields.zip = req.body.zip;
    if (req.body.skillstatus) groupFields.skillstatus = req.body.skillstatus;
    if (req.body.climber) groupFields.climber = req.body.climber;
    if (req.body.travel) groupFields.travel = req.body.travel;
    if (req.body.camp) groupFields.camp = req.body.camp;
    if (req.body.bio) groupFields.bio = req.body.bio;
    
    // Check if handle exists
    Group.findOne({ handle: groupFields.handle }).then(group => {
        //console.log(group);
        if (group) {
        errors.handle = 'That handle already exists';
        res.status(400).json(errors);
        }
        // Save Group
        //new Group(groupFields).save().then(group => res.json(group));
        const temp = new Group(groupFields);
        temp.save((error) => {
          if(error) {
            console.log('Error has occurred');
          }
          //console.log(temp);
        });
        //console.log(groupFields);
        
        //console.log('Group saved successfully');
    });
  }
);

//EDIT GROUP GOES HERE


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
    
    Group.findOne({ handle: groupFields.handle }).then(group => {
      if (group) {
        // Update
        Group.findOneAndUpdate(
          { $set: groupFields },
          { new: true }
        ).then(group => res.json(group));
      }
  });
}
);


// @route   DELETE api/group
// @desc    Delete group
// @access  Private
router.delete(
  '/:handle',
  (req, res) => {
    Group.findOneAndRemove({ handle: req.handle }).then(() => {
        res.json({ success: true })
    });
  }
);

module.exports = router;
