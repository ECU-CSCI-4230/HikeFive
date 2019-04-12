const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateMatchInput(data) {
  let errors = {};

  data.skillMin = !isEmpty(data.skillMin) ? data.skillMin : '';
  data.skillMax = !isEmpty(data.skillMax) ? data.skillMax : '';
  data.travel = !isEmpty(data.travel) ? data.travel : '';
  data.camp = !isEmpty(data.camp) ? data.camp : '';
  data.climber = !isEmpty(data.climber) ? data.climber : '';

  if (Validator.isEmpty(data.skillMin)) {
    errors.skillMin = 'Skill Min field is required';
  }

  if (Validator.isEmpty(data.skillMax)) {
    errors.skillMax = 'Skill Max field is required';
  }

  if (Validator.isEmpty(data.travel)) {
    errors.travel = 'Travel field is required';
  }

  if (Validator.isEmpty(data.camp)) {
    errors.camp = 'Camp field is required';
  }

  if (Validator.isEmpty(data.climber)) {
    errors.climber = 'Climb field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
