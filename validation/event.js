const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEventInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.start = !isEmpty(data.start) ? data.start : '';
  data.end = !isEmpty(data.end) ? data.end : '';
  data.location = !isEmpty(data.location) ? data.location : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.start)) {
    errors.start = 'Start field is required';
  }

  if (Validator.isEmpty(data.end)) {
    errors.end = 'End field is required';
  }

  if (Validator.isEmpty(data.location)) {
    errors.location = 'Location field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
