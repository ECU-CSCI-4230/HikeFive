import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class GroupItem extends Component {
  render() {
    const { group } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
        <div className="col-2">
            <img src={group.avatar} alt="" className="rounded-circle" />
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
