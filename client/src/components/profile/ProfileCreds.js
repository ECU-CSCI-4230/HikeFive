import React, { Component } from 'react';
import Moment from 'react-moment';

class ProfileCreds extends Component {
  render() {
    const {trip} = this.props;

    const tripItems = trip.map(trp => (
      <li key={trp._id} className="list-group-item">
        <h4>{trp.name}</h4>
        <p>
          <Moment format="YYYY/MM">{trp.date}</Moment>
        </p>
        <p>
          {trp.location === '' ? null : (
            <span>
              <strong>Location: </strong> {trp.location}
            </span>
          )}
        </p>
        <p>
          {trp.description === '' ? null : (
            <span>
              <strong>About: </strong> {trp.description}
            </span>
          )}
        </p>
        <p>
          {trp.difficulty === '' ? null : (
            <span>
                <strong>Difficulty: </strong> {trp.difficulty}
            </span>
          )}
        </p>
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <h3 className="text-center text-info">Trips/Hikes</h3>
          {tripItems.length > 0 ? (
            <ul className="list-group">{tripItems}</ul>
          ) : (
            <p className="text-center">No Experience Listed</p>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
