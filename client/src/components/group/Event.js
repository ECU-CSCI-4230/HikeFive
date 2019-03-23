import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEvent } from '../../actions/groupActions';

class Event extends Component {
    onDeleteClick(id) {
        this.props.deleteEvent(id);
      }
  
    render() {
    //const {trip} = this.props;

    const eventItems = this.props.event.map(evt => (
      <li key={evt._id} className="d-flex list-group-item justify-content-center align-items-center flex-column bg-light">
        <h4>{evt.name}</h4>
        <p>
          <a>Start: <Moment format="MM/YY">{evt.start}</Moment> </a>
        </p>
        <p>
          <a>End: <Moment format="MM/YY">{evt.end}</Moment> </a>
        </p>
        <p>
          {evt.location === '' ? null : (
            <span>
              <a>Location: {evt.location} </a>
            </span>
          )}
        </p>
        <p>
          About:
        </p>
        <p>
          {evt.info === '' ? null : (
            <span>
              {evt.info}
            </span>
          )}
        </p>
        <p>
          <button
            onClick={this.onDeleteClick.bind(this, evt._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </p>
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
        <div className="card card-body bg-light mb-3">
          <h3 className="text-center text-secondary">Events</h3>
          {eventItems.length > 0 ? (
            <ul className="list-group list-group-flush">{eventItems}</ul>
          ) : (
            <p className="d-flex flex-wrap justify-content-center align-items-center">No Events</p>
          )}
        </div>
        </div>
      </div>
    );
  }
}
Event.propTypes = {
    deleteEvent: PropTypes.func.isRequired
  };
  
export default connect(null, { deleteEvent })(Event);