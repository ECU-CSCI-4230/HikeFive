import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ProfileItem from '../../components/profiles/ProfileItem';
import { getMembers } from '../../actions/groupActions';

class GroupMembers extends Component {
  componentDidMount() {
    const { group } = this.props;
    const arrayLength = group.teammember.length;
    var array = [];

    array.push(group.ownerid);
    for (var i = 0; i < arrayLength; i++) {
        array.push(group.teammember[i].ids);
    }
    const pass = {ids: array}
    
    this.props.getMembers(pass);
  }

  render() {
    //console.log(this.props);
    const { members, loading } = this.props.member;
    let profileItems;

    if (members === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (members.length > 0) {
        profileItems = members.map(member => (
          <ProfileItem key={member._id} profile={member} />
        ));
      } else {
        profileItems = <h4>No Members found...</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Hikers</h1>
              <p className="lead text-center">
                List of all registered Users with a Profile
              </p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GroupMembers.propTypes = {
  getMembers: PropTypes.func.isRequired,
  member: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  member: state.member
});

export default connect(mapStateToProps, { getMembers })(GroupMembers);
