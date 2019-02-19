const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateTripInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.location = !isEmpty(data.location) ? data.location : '';
  data.description = !isEmpty(data.description) ? data.description : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.location)) {
    errors.location = 'Location field is required';
  }

  if (Validator.isEmpty(data.description)) {
    errors.fieldescriptiondofstudy = 'Descriptionfield is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
