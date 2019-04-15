import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

class Navbar extends Component {

  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }
  onSearchClick = () => {
    var searchString = document.getElementById("query").value;
    this.props.history.push(`/search/${searchString}`);
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    // Links for logged in user
    const authLinks = (
      <ul className="navbar-nav ml-auto ">
        <form className="form-inline">
          <input className="form-control mr-2 mt-1 mb-1" type="search" placeholder="Search" aria-label="Search" id="query" />
          <button className="btn btn-elegant btn-rounded btn-sm my-0 mt-1 mb-1" type="submit" onClick={this.onSearchClick.bind()}>Search</button>
        </form>
        <li className="nav-item">
          <Link className="nav-link mt-1 mb-1" to="/groups-landing">
            {' '}
            Groups
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link mt-1 mb-1" to="/matchmaking">
            {' '}
            Matchmaking
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link mt-1 mb-1" to="/feed">
            Feed
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link mt-1 mb-1" to="/user-settings">
            Settings
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link mt-1 mb-1" to="/profile">
            Profile
          </Link>
        </li>

        <li className="nav-item">
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link mt-1 mb-1"
          >
            {' '}
            Logout
          </a>
        </li>
      </ul>
    );

    // Links when not logged in
    const guestLinks = (
      <ul className="navbar-nav ml-auto" >
        <li className="nav-item">
          <Link className="nav-link mt-1 mb-1" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link mt-1 mb-1" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4 ">
        <div className="container">
          <Link className="navbar-brand" to="/feed">
            <img className="rounded-circle logo" src="https://i.imgur.com/gfra7Eh.jpg" title="source: imgur.com" alt="" />{' '}
            HikeFive
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
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })
  (withRouter(Navbar));
