import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { editGroup, getGroupByHandle } from '../../actions/groupActions';
import isEmpty from '../../validation/is-empty';

class EditGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getGroupByHandle(this.props.match.params.handle);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.group.group) {
      const group = nextProps.group.group;
      
      group.name = !isEmpty(group.name) ? group.name : '';
      group.avatar = !isEmpty(group.avatar) ? group.avatar : '';
      group.zip = !isEmpty(group.zip) ? group.zip : '';
      group.skillstatus = !isEmpty(group.skillstatus) ? group.skillstatus : '';
      group.climber = !isEmpty(group.climber) ? group.climber : '';
      group.travel = !isEmpty(group.travel) ? group.travel : '';
      group.camp = !isEmpty(group.camp) ? group.camp : '';
      group.bio = !isEmpty(group.bio) ? group.bio : '';
      group.social = !isEmpty(group.social) ? group.social : {};
      group.facebook = !isEmpty(group.social.facebook) ? group.social.facebook : '';
      group.twitter = !isEmpty(group.social.twitter) ? group.social.twitter : '';
      group.youtube = !isEmpty(group.social.youtube) ? group.social.youtube : '';
      group.instagram = !isEmpty(group.social.instagram) ? group.social.instagram : '';


      // Set component fields state
      this.setState({
        handle: group.handle,
        name: group.name,
        avatar: group.avatar,
        zip: group.zip,
        skillstatus: group.skillstatus,
        climber: group.climber,
        travel: group.travel,
        camp: group.camp,
        bio: group.bio,
        twitter: group.twitter,
        facebook: group.facebook,
        youtube: group.youtube,
        instagram: group.instagram
      });

    }
  }

  onSubmit(e) {
    e.preventDefault();

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
      facebook: this.state.facebook,
      twitter: this.state.twitter,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };
    
    this.props.editGroup(groupData, this.props.history);
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
      <div className="edit-group">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Group</h1>
              <p className="lead text-center">
                Let's get some information about your group
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Group Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                  info="What is the name of your group?"
                />
                <TextFieldGroup
                  placeholder="* Enter URL Image Address"
                  name="avatar"
                  value={this.state.avatar}
                  onChange={this.onChange}
                  error={errors.avatar}
                  info="Enter the URL image address for the group picture"
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
      </div >
    );
  }
}

EditGroup.propTypes = {
  editGroup: PropTypes.func.isRequired,
  getGroupByHandle: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  group: state.group,
  errors: state.errors
});

export default connect(mapStateToProps, { editGroup, getGroupByHandle })(
  withRouter(EditGroup)
);