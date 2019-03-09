import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import Spinner from '../common/Spinner';
import { getProfileByHandle, getCurrentProfile } from '../../actions/profileActions';

class myProfile extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push('/not-found');
    }
  }


  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
          profileContent = (
        <div>
          <ProfileHeader profile={profile} />
          <nav className="d-flex justify-content-center navbar navbar-expand-sm navbar-dark bg-dark">
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <Link className="nav-item nav-link" to={`/wall/${profile.handle}`}>Wall</Link>
                  <Link className="nav-item nav-link" to={`/about/${profile.handle}`}>About</Link>
                  <Link className="nav-item nav-link" to={`/trips/${profile.handle}`}>Trips</Link>
                </div>
              </div>
            </nav>
            <br/>
          <ProfileAbout profile={profile} />
          <ProfileCreds trip={profile.trip} />
        </div>
          );
    }else{
        // User is logged in but has no profile
        profileContent = (
            <div>
              <p className="lead text-muted">Welcome {user.name}</p>
              <p>You have not yet setup a profile, please add some info</p>
              <Link to="/create-profile" className="btn btn-lg btn-info">
                Create Profile
              </Link>
            </div>
          );
    }
}

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

myProfile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileByHandle, getCurrentProfile })(myProfile);
