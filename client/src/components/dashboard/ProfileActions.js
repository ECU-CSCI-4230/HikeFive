import React from 'react';
import { Link } from 'react-router-dom';

const ProfileActions = () => {
  return (
    <div className="btn-group-vertical" role="group">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
      </Link>
      <br></br>
      <Link to="/Notification-Settings" className="btn btn-light">
              <i className="fas fa-exclamation text-info mr-1" /> Notification Settings
              </Link>
              <br></br>

      <Link to="change-password" className="btn btn-light">
            <i className="fas fa-key text-info mr-1" /> Change Password
            </Link>
    </div>
  );
};

export default ProfileActions;