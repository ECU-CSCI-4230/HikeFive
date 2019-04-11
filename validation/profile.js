const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.skillstatus = !isEmpty(data.skillstatus) ? data.skillstatus : '';

  data.status = !isEmpty(data.status) ? data.status : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle needs to between 2 and 4 characters';
  }
  
  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Profile handle is required';
  }

  if (Validator.isEmpty(data.zip)) {
    errors.zip = 'zip field is required';
  }

  if (Validator.isEmpty(data.country)) {
    errors.country = 'zip field is required';
  }

  if (Validator.isEmpty(data.skillstatus)) {
    errors.skillstatus = 'skill level field is required';
  }

  if (Validator.isEmpty(data.climber)) {
    errors.climber = 'climber field is required';
  }

  if (Validator.isEmpty(data.travel)) {
    errors.travel = 'travel field is required';
  }

  if (Validator.isEmpty(data.camp)) {
    errors.camp = 'camp field is required';
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = 'Not a valid URL';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
