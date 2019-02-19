import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SelectListGroup from '../common/SelectListGroup';
import { addTrip } from '../../actions/profileActions';

class AddTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      date: '',
      location: '',
      description: '',
      difficulty: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const tripData = {
      name: this.state.name,
      date: this.state.date,
      location: this.state.location,
      description: this.state.description,
      difficulty: this.state.difficulty,
    };

    this.props.addTrip(tripData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  render() {
    const { errors } = this.state;
    
    // Select options for difficulty
    const diffOptions = [
      { label: 'Select', value: 0 },
      { label: '1', value: 1 },
      { label: '2', value: 2 },
      { label: '3', value: 3 },
      { label: '4', value: 4 },
      { label: '5', value: 5 }
    ];

    return (
      <div className="add-trip">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Trip</h1>
              <p className="lead text-center">
                Add a trip you have taken
              </p>
              <small className="d-block pb-3">All fields are required</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="* Date of trip MM/DD/YYYY"
                  name="date"
                  value={this.state.date}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="* Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="* Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                />
                <SelectListGroup
                  placeholder="* Difficulty"
                  name="difficulty"
                  value={this.state.difficulty}
                  onChange={this.onChange}
                  options={diffOptions}
                  info="What was the difficulty level?"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddTrip.propTypes = {
  addTrip: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addTrip })(
  withRouter(AddTrip)
);
