import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profileActions';

class myProfile extends Component {
  componentDidMount() { 
   this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push('/not-found');
    }
  }

  render() {
    const { user } = this.props.auth;
    const { profile } = this.props.profile;
    
    if (profile !== null) {
      if (user.id === profile.user._id){
        window.location.replace(`/wall/${profile.handle}`);
      }
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12"/>
          </div>
        </div>
      </div>
    );
  }
}

myProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(myProfile);
