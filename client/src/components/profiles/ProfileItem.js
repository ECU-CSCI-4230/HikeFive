import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import defaultAvatar from '../../img/defaultAvatar.jpg';

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    var profileAvatar;

    if (profile.avatar === '') {
      profileAvatar = defaultAvatar;
    }
    else {
      profileAvatar = profile.avatar;
    }

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2 d-none d-sm-block">
            <img src={profileAvatar} alt="" className="rounded-circle" />
          </div>
          <div className="col">
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
