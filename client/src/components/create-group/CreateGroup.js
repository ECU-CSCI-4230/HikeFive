import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createGroup } from '../../actions/groupActions';
import { getCurrentProfile } from '../../actions/profileActions';

class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test:'',
      handle: '',
      name: '',
      avatar: '',
      zip: '',
      skillstatus: '',
      climber: '',
      travel: '',
      camp: '',
      bio: '',
      twitter: '',
      facebook: '',
      youtube: '',
      instagram: '',
      ownerid:'',
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
  }

  onSubmit(e) {
    e.preventDefault();
    const {profile} = this.props.profile;
    //console.log(profile.user._id);

    const groupData = {
      handle: this.state.handle,
      name: this.state.name,
      avatar: this.state.avatar,
      zip: this.state.zip,
      skillstatus: this.state.skillstatus,
      climber: this.state.climber,
      travel: this.state.travel,
      camp: this.state.camp,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      youtube: this.state.youtube,
      instagram: this.state.instagram,
      ownerid: profile.user._id
    };
    this.props.createGroup(groupData, this.props.history);
    //this.props.history.push(`/groupwall/${groupData.handle}`);
    this.props.history.push("/feed");
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;
    //const {profile} = this.props.profile;
    //const obj = JSON.parse(JSON.stringify(profile));
    //console.log(profile);
    /*{"_id":"5c9154f0416bc437447befa6",
    "user":{"_id":"5c9154d7416bc437447befa5","name":"Oliver Chen",
    "avatar":"//www.gravatar.com/avatar/6f69901ed9ec04c0dec908207d48a35a?s=200&r=pg&d=mm"}
    ,"handle":"chenh15","zip":"123456","gender":"male","skillstatus":"5","climber":"Yes","travel":"Yes","camp":"Yes","trip":[],"experience":[],"education":[],
    "date":"2019-03-19T20:45:36.283Z","__v":0}*/

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
      <div className="create-group">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create A Group</h1>
              <p className="lead text-center">
                Let's get some information about your group
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Group Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your group"
                />
                <TextFieldGroup
                  placeholder="* Group Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                  info="What is the name of your group?"
                />
                <TextFieldGroup
                  placeholder="* Enter a URL Image Address"
                  name="avatar"
                  value={this.state.avatar}
                  onChange={this.onChange}
                  error={errors.avatar}
                  info="Enter a URL image address for the group picture"
                />
                <TextFieldGroup
                  placeholder="* Required"
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
                  info="What is the skill level for your group?"
                />
                <SelectListGroup
                  placeholder="climber"
                  name="climber"
                  value={this.state.climber}
                  onChange={this.onChange}
                  options={options}
                  error={errors.climber}
                  info="Is this group for climbers?"
                />
                <SelectListGroup
                  placeholder="travel"
                  name="travel"
                  value={this.state.travel}
                  onChange={this.onChange}
                  options={options}
                  error={errors.travel}
                  info="Is this group for travellers"
                />
                <SelectListGroup
                  placeholder="camp"
                  name="camp"
                  value={this.state.camp}
                  onChange={this.onChange}
                  options={options}
                  error={errors.camp}
                  info="Is this group for campers?"
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about your group"
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
CreateGroup.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  group: state.group,
  errors: state.errors
});
export default connect(mapStateToProps, { getCurrentProfile, createGroup })(
  withRouter(CreateGroup)
);