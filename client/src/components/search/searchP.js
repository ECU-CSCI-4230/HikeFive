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
        //groupItems = <h4>No Groups found...</h4>;
      }
    }

    return (
      <div className="search">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Search Results</h1>
              <p className="lead text-center">
               Searched For: {this.props.match.params.searchString}
              </p>

              <ul className="nav nav-pills justify-content-center" id="searchResults" role="tablist">
                <li className="nav-item nav-li active">
                  <a className="nav-link text-white tab-color active" id="user-tab" data-toggle="pill" href="#users" role= "tab" aria-controls="users" aria-selected="true">Users</a>
                </li>
                <li className="nav-item nav-li">
                  <a className="nav-link text-white tab-color" id="group-tab" data-toggle="pill" href="#groups" role= "tab" aria-controls="groups" aria-selected="false">Groups</a>
                </li>
              </ul>

              <div className="tab-content" id="searchResultsContent">
                <div className="tab-pane fade show active" id="users" role="tabpanel" aria-labelledby="user-tab"> <br/>{ searchItems}</div>
                <div className="tab-pane fade" id="groups" role="tabpanel" aria-labelledby="group-tab">< br/> {groupItems}</div>
              </div>


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
