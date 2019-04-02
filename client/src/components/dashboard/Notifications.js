import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions'
;

class Notifications extends Component {

render(){

return(
    <div className="Notifications">
        <div className="container">
            <div className="row">
                <div className="col-md m-auto">
                    <h1 className="display-4 text-center"> Notification Settings </h1>
            <button className="btn btn-light btn-block mt-4"> Turn notifications on</button>
            <button className="btn btn-light btn-block mt-4"> Turn notifications off</button>
                </div>
            </div>
        </div>
    </div>
)
}
};

export default Notifications;

