import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      zip: '',
      skillstatus: '',
      climber:'',
      travel:'',
      camp:'',
      bio: '',
      twitter: '',
      facebook: '',
      youtube: '',
      instagram: '',
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

      // If profile field doesnt exist, make empty string
      profile.zip = !isEmpty(profile.zip) ? profile.zip : '';
      profile.skillstatus = !isEmpty(profile.skillstatus) ? profile.skillstatus : '';
      profile.climber = !isEmpty(profile.climber) ? profile.climber : '';
      profile.travel = !isEmpty(profile.travel) ? profile.travel : '';
      profile.camp = !isEmpty(profile.camp) ? profile.camp : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook: '';
      profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter: '';
      profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube: '';
      profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram: '';
      
      // Set component fields state
      this.setState({
        handle: profile.handle,
        gender: profile.gender,
        zip: profile.zip,
        skillstatus: profile.skillstatus,
        climber: profile.climber,
        travel:profile.travel,
        camp:profile.camp,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        youtube: profile.youtube,
        instagram: profile.instagram       
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      gender: this.state.gender,
      zip: this.state.zip,
      skillstatus: this.state.skillstatus,
      climber:this.state.climber,
      travel:this.state.travel,
      camp:this.state.camp,
      bio: this.state.bio,
      facebook: this.state.facebook,
      twitter: this.state.twitter,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };
    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="Facebook Profile URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }

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

   return (
    <div className="edit-profile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to={`/dashboard`} className="btn btn-secondary">
                Go Back
            </Link>
            <h1 className="display-4 text-center">Edit Profile</h1>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                placeholder=""
                name="zip"
                value={this.state.zip}
                onChange={this.onChange}
                error={errors.zip}
                info="What is your zip code?"
              />
              <SelectListGroup
                placeholder="skillstatus"
                name="skillstatus"
                value={this.state.skillstatus}
                onChange={this.onChange}
                options={Skilloptions}
                error={errors.skillstatus}
                info="What is your skill level?"
              />
              <SelectListGroup
                placeholder="climber"
                name="climber"
                value={this.state.climber}
                onChange={this.onChange}
                options={options}
                error={errors.climber}
                info="Are you a Climber?"
              />
              <SelectListGroup
                placeholder="travel"
                name="travel"
                value={this.state.travel}
                onChange={this.onChange}
                options={options}
                error={errors.travel}
                info="Are you willing to travel to other countries?"
              />              
              <SelectListGroup
                placeholder="camp"
                name="camp"
                value={this.state.camp}
                onChange={this.onChange}
                options={options}
                error={errors.camp}
                info="Are you willing to camp?"
              />
              <TextAreaFieldGroup
                placeholder="Short Bio"
                name="bio"
                value={this.state.bio}
                onChange={this.onChange}
                error={errors.bio}
                info="Tell us a little about yourself"
              />           

              <div className="mb-3">
                <button
                  type="button"
                  onClick={() => {
                    this.setState(prevState => ({
                      displaySocialInputs: !prevState.displaySocialInputs
                    }));
                  }}
                  className="btn btn-light"
                >
                  Add Social Network Links
                </button>{" "}
                <span className="text-muted">Optional</span>
              </div>
              {socialInputs}
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


EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);