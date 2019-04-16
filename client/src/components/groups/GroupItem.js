import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import defaultAvatar from '../../img/defaultGroupAvatar.jpg';

class GroupItem extends Component {
  render() {
    const { group } = this.props;

    var groupAvatar;

    if (typeof group.avatar === 'undefined') {
      groupAvatar = defaultAvatar;
      console.log("it works");
      console.log(groupAvatar);
    }
    else {
      groupAvatar = group.avatar;
    }

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img src={groupAvatar} alt="" className="rounded-circle" />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{group.name}</h3>
            <Link to={`/groupwall/${group.handle}`} className="btn btn-dark">
              View Group
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

GroupItem.propTypes = {
  group: PropTypes.object.isRequired
};

export default GroupItem;
