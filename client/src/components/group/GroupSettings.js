import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGroupByHandle, deleteGroup } from '../../actions/groupActions';
import Spinner from '../common/Spinner';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getGroupByHandle(this.props.match.params.handle);
  }

  onDeleteClick(e) {
    this.props.deleteGroup(this.props.match.params.handle);
  }


  render() {
    const { group, loading } = this.props.group;

    let dashboardContent;

    if (group === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(group).length > 0) {
        dashboardContent = (
          <div>
            <div className="btn-group-vertical d-flex flex-wrap justify-content-center align-items-center " role="group">
              <Link to={`/edit-group/${group.handle}`} className="btn btn-light">
               <i className="fas fa-user-circle text-dark mr-1" /> Edit Group
              </Link>
              <br></br>
              <Link to="/edit-trips" className="btn btn-light">
               <i className="fas fa-user-circle text-dark mr-1" /> Edit Trips
              </Link>
              <br></br>
              <button onClick={ this.onDeleteClick.bind(this)} className="btn btn-danger">
                <i className="fas fa-trash-alt" /> Delete Group </button>
            </div>          
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="d-flex flex-wrap justify-content-center align-items-center display-4">Settings</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getGroupByHandle: PropTypes.func.isRequired,
  deleteGroup: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired
} ;

const mapStateToProps = state => ({
  group: state.group
} );

export default connect(mapStateToProps, { getGroupByHandle, deleteGroup })(
  Dashboard
);

