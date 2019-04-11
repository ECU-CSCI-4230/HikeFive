import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { getCurrentProfile } from '../../actions/profileActions';

class MatchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skillMin: '',
      skillMax: '',
      travel: '',
      camp: '',
      climber: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      // Set component fields state
      this.setState({
        handle: profile.handle,
        country: profile.country
      });
    }
  }


  onSubmit(e) {
    e.preventDefault();

    const matchData = {
      skillMin: this.state.skillMin,
      skillMax: this.state.skillMax,
      travel: this.state.travel,
      camp: this.state.camp,
      climber: this.state.climber,
      handle: this.state.handle,
      country: this.state.country
    };
    this.props.history.push({
      pathname: "/matches", 
      data: matchData
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    // Select options for status
    const Skilloptions = [
      { label: '* Select', value: 0 },
      { label: '1', value: 1 },
      { label: '2', value: 2 },
      { label: '3', value: 3 },
      { label: '4', value: 4 },
      { label: '5', value: 5 }
    ];

    const options = [
      { label: '* Select', value: 0 },
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' }
    ];

    //Need to do trigger other options 
    //Check that all fields are working correctly

    //Need to add a form option that asks when they want to travel but this requires a lot of other features to work
    return (
      <div className="match-form">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/dashboard`} className="btn btn-secondary">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Matchmaking Form</h1>
              <small className="d-block pb-3">* = required fields</small>

              <form onSubmit={this.onSubmit}>
                <div className="text-center">
                  <h4 className="text-center">What skill level are you looking for?</h4>
                  <div className="row">
                    <div className="col-6 ">
                      <SelectListGroup
                        placeholder="skillMin"
                        name="skillMin"
                        value={this.state.skillMin}
                        onChange={this.onChange}
                        options={Skilloptions}
                        error={errors.skillMin}
                        info="*Minimum Skill Level?"
                      />
                    </div>
                    <div className="col-6">
                      <SelectListGroup
                        placeholder="skillMax"
                        name="skillMax"
                        value={this.state.skillMax}
                        onChange={this.onChange}
                        options={Skilloptions}
                        error={errors.skillMax}
                        info="*Maximum Skill Level?"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-center">Are you looking to Travel?</h4>
                  <SelectListGroup
                    placeholder="travel"
                    name="travel"
                    value={this.state.travel}
                    onChange={this.onChange}
                    options={options}
                    error={errors.travel}
                  />
                </div>

                <div>
                  <h4 className="text-center">Are you looking for a camping trip?</h4>
                  <SelectListGroup
                    placeholder="camp"
                    name="camp"
                    value={this.state.camp}
                    onChange={this.onChange}
                    options={options}
                    error={errors.camp}
                  />
                </div>
                <div>
                  <h4 className="text-center">Do you want to go climbing?</h4>
                  <SelectListGroup
                    placeholder="climber"
                    name="climber"
                    value={this.state.climber}
                    onChange={this.onChange}
                    options={options}
                    error={errors.climber}
                  />
                </div>

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-secondary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


MatchForm.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { getCurrentProfile })(
  withRouter(MatchForm)
);