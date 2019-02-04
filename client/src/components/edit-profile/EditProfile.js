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

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: '',
      zip: '',
      skillstatus: '',
      priortrip:'',
      climber:'',
      criminal:'',
      travel:'',
      purchase:'',
      overnight:'',
      camp:'',
      time:'',
      bio: '',

      /*
      company: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      */
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

      // Bring skills array back to CSV
      //const skillsCSV = profile.skills.join(',');

      // If profile field doesnt exist, make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : '';
      profile.zip = !isEmpty(profile.zip) ? profile.zip : '';
      profile.skillstatus = !isEmpty(profile.skillstatus) ? profile.skillstatus : '';
      profile.priortrip = !isEmpty(profile.priortrip) ? profile.priortrip : '';
      profile.climber = !isEmpty(profile.climber) ? profile.climber : '';
      profile.criminal = !isEmpty(profile.criminal) ? profile.criminal : '';
      profile.travel = !isEmpty(profile.travel) ? profile.travel : '';
      profile.purchase = !isEmpty(profile.purchase) ? profile.purchase : '';
      profile.overnight = !isEmpty(profile.overnight) ? profile.overnight : '';
      profile.camp = !isEmpty(profile.camp) ? profile.camp : '';
      profile.time = !isEmpty(profile.time) ? profile.time : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      
      /*
      profile.location = !isEmpty(profile.location) ? profile.location : '';
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : '';
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : '';
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : '';
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : '';
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : '';
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : '';
        */

      // Set component fields state
      this.setState({
        handle: profile.handle,
        zip: profile.zip,
        skillstatus: profile.skillstatus,
        priortrip: profile.priortrip,
        climber: profile.climber,
        criminal:profile.criminal,
        travel:profile.travel,
        purchase:profile.purchase,
        overnight:profile.overnight,
        camp:profile.camp,
        time:profile.time,
        bio: profile.bio,

        /*
        company: profile.company,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram
        */
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      zip: this.state.zip,
      skillstatus: this.state.skillstatus,
      priortrip:this.state.priortrip,
      climber:this.state.climber,
      criminal:this.state.criminal,
      travel:this.state.travel,
      purchase:this.state.purchase,
      overnight:this.state.overnight,
      camp:this.state.camp,
      time:this.state.time,
      bio: this.state.bio,
      /*
      company: this.state.company,
      location: this.state.location,
      status: this.state.status,     
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
      */
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
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
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

    /*
    <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="If you want your latest repos and a Github link, include your username"
                />
    */
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname"
                />
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
                  info="What is skill level?"
                />
                <TextFieldGroup
                  placeholder="priortrip"
                  name="priortrip"
                  value={this.state.priortrip}
                  onChange={this.onChange}
                  error={errors.priortrip}
                  info="What prior trips/hikes have you done?"
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
                  placeholder="criminal"
                  name="criminal"
                  value={this.state.criminal}
                  onChange={this.onChange}
                  options={options}
                  error={errors.criminal}
                  info="Are you a Criminal?"
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
                  placeholder="purchase"
                  name="purchase"
                  value={this.state.purchase}
                  onChange={this.onChange}
                  options={options}
                  error={errors.purchase}
                  info="Are you willing to purchase gear or do your already have gear?"
                />
                <SelectListGroup
                  placeholder="overnight"
                  name="overnight"
                  value={this.state.overnight}
                  onChange={this.onChange}
                  options={options}
                  error={errors.overnight}
                  info="Are you willing to hike overnight?"
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
                <TextFieldGroup
                  placeholder=""
                  name="time"
                  value={this.state.time}
                  onChange={this.onChange}
                  error={errors.time}
                  info="When are you avaliable to hike?"
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
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
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

CreateProfile.propTypes = {
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
  withRouter(CreateProfile)
);
