import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GroupHeader from './GroupHeader';
import Spinner from '../common/Spinner';
import { getGroupByHandle } from '../../actions/groupActions';
import GroupFeed from './GroupFeed';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../../actions/profileActions';

class Wall extends Component {

  componentDidMount() {
    this.props.getCurrentProfile();
    const {profile} = this.props.profile;
    //console.log(profile);
    /*this.setState({
      currentuserId: profile.user._id
    })*/


    if (this.props.match.params.handle) {
      this.props.getGroupByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.group.group === null && this.props.group.loading) {
      this.props.history.push('/not-found');
    }
  }

  Testfunction(){
    alert("hello world");
  }

  render() {
    const { group, loading } = this.props.group;
    const {profile} = this.props.profile;

    let WallContent;

    if ((group && profile) === null || loading) {
      WallContent = <Spinner />;
    } else {
      const groupownerId = group.ownerid;
      const currentuserId = profile.user._id;

      let groupSetting;
      /*
      console.log("This is current ID:");
      console.log(currentuserId);
      console.log("This is owner ID:");
      console.log(groupownerId);
      */
      if (groupownerId===currentuserId){
        //console.log("This is MY GROUP");
        groupSetting = <Link className="nav-item nav-link" to={`/groupsettings/${group.handle}`}>Settings</Link>;
      }
      
      WallContent = (
        <div>
          <GroupHeader group={group} />
          <nav className="d-flex justify-content-center navbar navbar-expand-sm navbar-dark bg-dark">
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" >
                <span className="navbar-toggler-icon"></span>
              </button>
              
              <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <Link className="nav-item nav-link active" to={`/groupwall/${group.handle}`}>Wall</Link>
                  <Link className="nav-item nav-link" to={`/groupabout/${group.handle}`}>About</Link>
                  <Link className="nav-item nav-link" to={`/grouptrips/${group.handle}`}>Trips</Link>
                  <Link className="nav-item nav-link" to={`/groupCalendar/${group.handle}`}>Calendar</Link>
                  {groupSetting}
                  <Link className="nav-item nav-link" to={`/addevent/${group.handle}`}>Add Event</Link>
                  <Link className="nav-item nav-link" to={`/groupabout/${group.handle}`}>Members</Link>
                  <button className="btn btn-dark" onClick={this.Testfunction}> Join Group </button>
                </div>
              </div>
            </nav>
            <br/>
            <GroupFeed group={group.handle} />
        </div>
      );
    }

    return (
      <div className="group">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{WallContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Wall.propTypes = {
  getGroupByHandle: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    group: state.group,
});

export default connect(mapStateToProps, { getGroupByHandle, getCurrentProfile })(Wall);
