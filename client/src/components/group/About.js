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
    if (this.props.match.params.handle) {
      this.props.getGroupByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.group.group === null && this.props.group.loading) {
      this.props.history.push('/not-found');
    }
  }

  render() {
    const { group, loading } = this.props.group;
    let groupContent;

    if (group === null || loading) {
        groupContent = <Spinner />;
    } else {
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
                  <Link className="nav-item nav-link" to={`/groupsettings/${group.handle}`}>Settings</Link>
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
    getGroupByHandle: PropTypes.func.isRequired,
    group: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  group: state.group
});

export default connect(mapStateToProps, { getGroupByHandle })(About);
