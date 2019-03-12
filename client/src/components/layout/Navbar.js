import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import {clearCurrentProfile } from '../../actions/profileActions';
import { searchProfiles } from '../../actions/profileActions';

class Navbar extends Component {

  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }
  onSearchClick() {
    var searchString = document.getElementById("query").value;
    console.log(searchString);
    //console.log(this.props.searchProfiles(searchString));
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    // What the user will see on the Navbar when they're logged in.
    const authLinks = (
      <ul className="navbar-nav ml-auto ">
        <form className="form-inline md-form mr-auto ">
          <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" id="query" />
          <button className="btn btn-elegant btn-rounded btn-sm my-0 d-none d-lg-block" type="submit" onClick={this.onSearchClick.bind()}>Search</button>
        </form>
        <li className="nav-item">
          <Link className="nav-link" to="/groups-landing">
            {' '}
            Groups
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/profiles">
            {' '}
            Users
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/feed">
            Feed
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Settings
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/my-profile">
            Profile
          </Link>
        </li>
        
        <li className="nav-item">
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: '25px', marginRight: '5px' }}
              title="You must have a Gravatar connected to your email to display an image"
            />{' '}
            Logout
          </a>
        </li>
      </ul>
    );
    
    // What the user will see on the Navbar when they're not logged in.
    const guestLinks = (
      <ul className="navbar-nav ml-auto" >
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4 ">
        <div className="container">
          <Link className="navbar-brand" to="/feed">
            <img className="rounded-circle logo" src="https://i.imgur.com/gfra7Eh.jpg" title="source: imgur.com" alt=""/>{' '}
              PikaHike
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  searchProfiles: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { searchProfiles, logoutUser, clearCurrentProfile })(
  Navbar
);
