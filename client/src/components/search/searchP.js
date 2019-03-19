import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ProfileItem from '../profiles/ProfileItem';
import { searchProfiles } from '../../actions/profileActions';

class Profiles extends Component {
  componentDidMount(query) {
    this.props.searchProfiles(query);
    console.log('here');
  }

  render() {
    const { profiles, loading } = this.props.profile;
    const currentUrl = window.location.href.split("/");
    const query = currentUrl[4];
    console.log('here');
    console.log(profiles);
    let searchItems;

    if (profiles === null || loading) {
      searchItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        searchItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        searchItems = <h4>No profiles found...</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">User Profiles</h1>
              <p className="lead text-center">
                List of all Current Users with Profile
              </p>
              {searchItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  searchProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { searchProfiles })(Profiles);
