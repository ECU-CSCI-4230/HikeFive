import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ProfileItem from '../profiles/ProfileItem';
import GroupItem from '../groups/GroupItem';
import { searchProfiles } from '../../actions/profileActions';
import { searchGroups } from '../../actions/groupActions';

class Search extends Component {
  componentDidMount() {
    var query = this.props.match.params.searchString;
    this.props.searchProfiles(query);
    this.props.searchGroups(query);
  }

  render() {
    console.log(this.props.match.params.searchString); //Search String
    const { profiles, loading } = this.props.profile;
    const { groups } = this.props.group;

    let searchItems;
    let groupItems;
    
    if (profiles === null || groups === null || loading) {
      searchItems = <Spinner />;
    } else {
      console.log(groups);
      if (profiles.length > 0 || groups.length >0) {
        if (profiles.length > 0) {
          searchItems = profiles.map(profile => (
            <ProfileItem key={profile._id} profile={profile} />
          ));
        }
        if (groups.length > 0) {
          groupItems = groups.map(group => (
            <GroupItem key={group._id} group={group} />
          ));
        }
      }
      else {
        searchItems = <h4>No profiles found...</h4>;
      }
    }

    return (
      <div className="search">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Search Results</h1>
              <p className="lead text-center">
                Number of Results: 
              </p>
              {searchItems} {groupItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  searchProfiles: PropTypes.func.isRequired,
  searchGroups: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  group: state.group
});

export default connect(mapStateToProps, { searchProfiles, searchGroups })(Search);
