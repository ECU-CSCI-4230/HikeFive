import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    // Get first name
    const firstName = profile.user.name.trim().split(' ')[0];

      
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">About</h3>
            <p className="lead">
              {isEmpty(profile.bio) ? (
                <span className="d-flex flex-wrap justify-content-center align-items-center">{firstName} does not have a bio</span>
              ) : (
                <span className="d-flex flex-wrap justify-content-center align-items-center">{profile.bio}</span>
              )}
            </p>
            <hr />
            <div className="row">
              <div class="col-md">
                <div className="d-flex flex-wrap justify-content-center align-items-center">
                  Location: {profile.zip}<br></br>
                  Skill Level: {profile.skillstatus}
                </div>
              </div>
              <div class="col-md">
                <div className="d-flex flex-wrap justify-content-center align-items-center">
                  Climber: {profile.climber}<br></br>
                  Camper: {profile.camp}<br></br>
                  Traveler: {profile.travel}<br></br>
                </div>
              </div>
            </div>
            <div className="row">
              <div class="col-md">
                <div className="d-flex flex-wrap justify-content-center align-items-center">
                  {isEmpty(profile.social && profile.social.facebook) ? null : (
                    <a href={profile.social.facebook}>Facebook</a>
                  )}<br></br>
                  {isEmpty(profile.social && profile.social.twitter) ? null : (
                    <a href={profile.social.twitter}>Twitter</a>
                  )}
                </div>
              </div>
              <div class="col-md">
                <div className="d-flex flex-wrap justify-content-center align-items-center">
                  {isEmpty(profile.social && profile.social.instagram) ? null : (
                      <a href={profile.social.instagram}>Instagram</a>
                  )}<br></br>
                  {isEmpty(profile.social && profile.social.youtube) ? null : (
                    <a href={profile.social.youtube}>YouTube</a>
                  )}
                </div>
              </div>
            </div>     
          </div>
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
