import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import defaultAvatar from '../../img/defaultAvatar.jpg';

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    var profileAvatar;

    if (typeof profile.avatar === 'undefined') {
      profileAvatar = defaultAvatar;
    }
    else {
      profileAvatar = profile.avatar;
    }

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img src={profileAvatar} alt="" className="rounded-circle" />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{profile.user.name}</h3>
            <p>
              {profile.status}{' '}
            </p>
            <Link to={`/wall/${profile.handle}`} className="btn btn-dark">
              View Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
