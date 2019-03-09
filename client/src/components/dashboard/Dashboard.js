import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }
   onChangePassword(e){
    this.props.changePassword();
}

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              <Link to={`/personfeed/${profile.handle}`} >Person Wall</Link>
            </p>

            <div className="btn-group-vertical d-flex flex-wrap justify-content-center align-items-center " role="group">
              <Link to="/edit-profile" className="btn btn-light">
               <i className="fas fa-user-circle text-dark mr-1" /> Edit Profile
              </Link>
              <br></br>
              <Link to="/EditTrip" className="btn btn-light">
               <i className="fas fa-user-circle text-dark mr-1" /> Edit Trips
              </Link>
              <br></br>
              <Link to="/Notification-Settings" className="btn btn-light">
                <i className="fas fa-exclamation text-dark mr-1" /> Notification Settings
              </Link>
              <br></br>
              <Link to="/Forgot" className="btn btn-light">
                <i className="fas fa-key text-dark mr-1" /> Change Password
              </Link>
              <br></br>
              <button onClick={ this.onDeleteClick.bind(this)} className="btn btn-danger">
                <i className="fas fa-trash-alt" /> Delete My Account </button>
            </div>          
          </div>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="d-flex flex-wrap justify-content-center align-items-center display-4">Settings</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
} ;

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
} );

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);

