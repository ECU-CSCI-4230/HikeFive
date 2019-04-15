import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GroupHeader from '../Sub-Components/GroupHeader';
import Calendar from '../Sub-Components/Calendar';
import Spinner from '../../common/Spinner';
import { getGroupByHandle } from '../../../actions/groupActions';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../../../actions/profileActions';

class EventCalendar extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getGroupByHandle(this.props.match.params.handle);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.group.group === null && this.props.group.loading) {
      this.props.history.push('/not-found');
    }
  }

  render() {
    const { group, loading } = this.props.group;
    const { profile } = this.props.profile;

    let CalendarContent;

    if ((group && profile === null) || loading) {
      CalendarContent = <Spinner />;
    } else {
      if (group !== null) {
        if (Object.keys(group).length > 0) {
          const groupownerId = group.ownerid;
          const currentuserId = profile._id;

          let groupSetting;

          if (groupownerId === currentuserId) {
            groupSetting = <Link className="nav-item nav-link" to={`/groupsettings/${group.handle}`}>Settings</Link>;
          }
          CalendarContent = (
            <div>
              <GroupHeader group={group} />
              <nav className="d-flex justify-content-center navbar navbar-expand-sm navbar-dark bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                  <div className="navbar-nav">
                    <Link className="nav-item nav-link" to={`/groupwall/${group.handle}`}>Wall</Link>
                    <Link className="nav-item nav-link" to={`/groupabout/${group.handle}`}>About</Link>
                    <Link className="nav-item nav-link" to={`/grouptrips/${group.handle}`}>Trips</Link>
                    <Link className="nav-item nav-link active" to={`/groupCalendar/${group.handle}`}>Calendar</Link>
                    <Link className="nav-item nav-link" to={`/groupmembers/${group.handle}`}>Members</Link>
                    {groupSetting}
                  </div>
                </div>
              </nav>
              <br />
              <Calendar />
              <br />
            </div>
          );
        }
      }
    }

    return (
      <div className="group">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{CalendarContent}</div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

EventCalendar.propTypes = {
  getGroupByHandle: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  group: state.group,
  profile: state.profile,
});

export default connect(mapStateToProps, { getGroupByHandle, getCurrentProfile })(EventCalendar);