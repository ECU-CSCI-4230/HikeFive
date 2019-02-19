import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteTrip } from '../../actions/profileActions';

class Trips extends Component {
  onDeleteClick(id) {
    this.props.deleteTrip(id);
  }

  render() {
    const trips = this.props.trips.map(trip => (
      <tr key={trip._id}>
        <td>{trip.name}</td>
        <td>{trip.location}</td>
        <td>{trip.description}</td>
        <td>
          <Moment format="YYYY/MM/DD">{trip.date}</Moment>
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, trip._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Trip Details</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Description</th>
              <th />
            </tr>
            {trips}
          </thead>
        </table>
      </div>
    );
  }
}

Trips.propTypes = {
  deleteTrip: PropTypes.func.isRequired
};

export default connect(null, { deleteTrip })(trips);
