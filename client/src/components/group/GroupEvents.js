import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

class GroupEvents extends Component {
  render() {
    const eventItems = this.props.events.map(evt => (
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

export default GroupEvents;