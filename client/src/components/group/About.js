import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import GroupHeader from './GroupHeader';
import GroupAbout from './GroupAbout';
import Spinner from '../common/Spinner';
import { getGroupByHandle } from '../../actions/groupActions';

class About extends Component {
  componentDidMount() {
    this.props.getGroupByHandle(this.props.match.params.handle);
}

  componentWillReceiveProps(nextProps) {
    if (nextProps.group.group === null && this.props.group.loading) {
      this.props.history.push('/not-found');
    }
  }

  render() {
    //console.log(this.props.match.params.handle);
    //console.log(this.props.group);
    const { group, loading } = this.props.group;
    const { user } = this.props.auth;

    let groupContent;

    if (group === null || loading) {
        groupContent = <Spinner />;
    } else {
      const groupownerId = group.ownerid;
      const currentuserId = user.id;

      let groupSetting;

      if (groupownerId===currentuserId){
        groupSetting = <Link className="nav-item nav-link" to={`/groupsettings/${group.handle}`}>Settings</Link>;
      }


        groupContent = (
        <div>
          <GroupHeader group={group} />
          <nav className="d-flex justify-content-center navbar navbar-expand-sm navbar-dark bg-dark">
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <Link className="nav-item nav-link" to={`/groupwall/${group.handle}`}>Wall</Link>
                  <Link className="nav-item nav-link active" to={`/groupabout/${group.handle}`}>About</Link>
                  <Link className="nav-item nav-link" to={`/grouptrips/${group.handle}`}>Trips</Link>
                  <Link className="nav-item nav-link" to={`/groupCalendar/${group.handle}`}>Calendar</Link>
                  {groupSetting}
                </div>
              </div>
            </nav>
            <br/>
          <GroupAbout group={group} />
        </div>
      );
    }

    return (
      <div className="group">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{groupContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

About.propTypes = {
    group: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  group: state.group,
  auth: state.auth
});

export default connect(mapStateToProps, { getGroupByHandle })(About);
