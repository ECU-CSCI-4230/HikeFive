import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { getCurrentProfile, matchMake } from '../../actions/profileActions';

class MatchForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        skillMin: '',
        skillMax: '',
        travel: '',
        camp: '',
        climber: '',
        group: '',
        destination: '',
        distance: '',
        coed: '',
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
          gender: profile.gender,
          zip: profile.zip    
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
        group: this.state.group,
        destination: this.state.destination,
        distance: this.state.distance,
        coed: this.state.coed,    
        handle: this.state.handle,
        gender: this.state.gender,
        zip: this.state.zip
      };

      this.props.matchMake(matchData, this.props.history);
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
  //The last option should really be triggered only if the person says no
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
                <div className="row">
                    <h4>What skill level are you looking for?</h4>
                    <div className="col">
                        <label for="skillMin">*Minimum Skill Level</label>
                        <select id="skillMin" className="form-control" options={Skilloptions} onChange={this.onChange} value={this.state.skillMin} error={errors.skillMin} placeholder="skillMin" name="skillMin"/>
                    </div>
                    <div className="col">
                        <label for="skillMax">*Maximum Skill Level</label>
                        <select id="skillMax" className="form-control" options={Skilloptions} onChange={this.onChange} value={this.state.skillMax} error={errors.skillMax} placeholder="skillMax" name="skillMax"/>
                    </div>
                </div>
                
                <div className="row"> 
                    <SelectListGroup
                    placeholder="travel"
                    name="travel"
                    value={this.state.travel}
                    onChange={this.onChange}
                    options={options}
                    error={errors.travel}
                    info="*Are you looking to travel?"
                    /> 
                </div>
                <div className="row">
                    <TextFieldGroup
                    placeholder="destination"
                    name="destination"
                    value={this.state.destination}
                    onChange={this.onChange}
                    error={errors.destination}
                    info="If Yes: Where do you want to go? (Country, Landmark, State/Province, City, Any)"
                    />           
                </div>
                <div className="row">
                    <TextFieldGroup
                    placeholder="distance"
                    name="distance"
                    value={this.state.distance}
                    onChange={this.onChange}
                    error={errors.distance}
                    info="If No: How close do you want to stay? (in miles)"
                    />           
                </div>


                <div className="row">
                    <SelectListGroup
                    placeholder="camp"
                    name="camp"
                    value={this.state.camp}
                    onChange={this.onChange}
                    options={options}
                    error={errors.camp}
                    info="*Are you looking for a camping trip?"
                    />
                </div>
                <div className="row">
                    <SelectListGroup
                    placeholder="climber"
                    name="climber"
                    value={this.state.climber}
                    onChange={this.onChange}
                    options={options}
                    error={errors.climber}
                    info="*Do you want to go climbing?"
                    />
                </div>
                <div className="row">
                    <SelectListGroup
                    placeholder="group"
                    name="group"
                    value={this.state.group}
                    onChange={this.onChange}
                    options={options}
                    error={errors.group}
                    info="*Do you want to go with a group?"
                    />
                </div>
                <div className="row">
                    <SelectListGroup
                    placeholder="coed"
                    name="coed"
                    value={this.state.coed}
                    onChange={this.onChange}
                    options={options}
                    error={errors.coed}
                    info="If no, are you comfortable meeting up with people of the opposite sex?"
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
  
  export default connect(mapStateToProps, { matchMake, getCurrentProfile })(
    withRouter(MatchForm)
  );