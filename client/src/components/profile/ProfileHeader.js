import React, { Component } from 'react';
import defaultBackground from '../../img/profile.jpg';

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    const backgroundURL = profile.background;

    var profileBG;

    if (typeof backgroundURL === 'undefined') {
      profileBG = {
        background: 'url(' + defaultBackground + ') no-repeat center center',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: '-1',
        position: 'relative',
        height: 300
      };
    }else{

    // Reference: The CSS class in App.css 'Wrapper' sets the user's profile background.
    // Reference: The CSS class in App.css 'Group-Wrapper' does the same thing, but for group bg pics.

    profileBG = {
      background: 'url(' + backgroundURL + ') no-repeat center center',
      backgroundSize:'cover',
      zIndex: '-1',
      position: 'relative',
    };
  }

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body mb-3" style={profileBG}>
            <div className="row">
              <div className="d-flex justify-content-center col-4 col-md-3 m-auto">
                <img
                  className="w-75 h-75 rounded-circle"
                  src={profile.avatar}
                  alt=""
                />
              </div>
            </div>
            <div className="text-center text-white">
              <h1 className="display-4 text-center">{profile.user.name}</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
