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
    console.log(this.props.group.group._id);
    this.props.deleteGroup(this.props.group.group._id, this.props.history);
  }


  render() {
    const { group, loading } = this.props.group;

    let dashboardContent;

    if (group === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //console.log(group._id);
      if (Object.keys(group).length > 0) {
        dashboardContent = (
          <div>
            <div className="btn-group-vertical d-flex flex-wrap justify-content-center align-items-center d-none d-md-none" role="group">
              <Link to={`/edit-group/${group.handle}`} className="btn btn-light">
                <i className="fas fa-user-circle text-dark mr-1" /> Edit Group
              </Link>
              <br></br>
              <Link to={`/edit-trips/${group.handle}`} className="btn btn-light">
                <i className="fas fa-user-circle text-dark mr-1" /> Edit Trips
              </Link>
              <br></br>
              <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">
                <i className="fas fa-trash-alt" /> Delete Group </button>
            </div>

            {/* This is only visible on screens larger than size small */}
            <div className="d-none d-md-block " role="group">
              <div className="card-deck d-flex justify-content-center">
                <div className="card bg-light text-center" >
                  <div className="card-body">
                    <h5 className="card-title">Edit Group</h5>
                    <p className="card-text">Use this to edit the group information.</p>
                    <Link to={`/edit-group/${group.handle}`} className="btn btn-secondary">Edit Group</Link>
                  </div>
                </div>
                <div className="card bg-light text-center" >
                  <div className="card-body">
                    <h5 className="card-title">Edit Trips</h5>
                    <p className="card-text">Use this to edit the group trips information.</p>
                    <Link to="/edit-trips" className="btn btn-secondary">Edit Trips</Link>
                  </div>
                </div>
              </div>
              <br />
              <div className="card-deck d-flex justify-content-center">
                <div className="card bg-light text-center" >
                  <div className="card-body">
                    <h5 className="card-title">EMPTY CARD</h5>
                    <p className="card-text">THIS IS AN EMPTY CARD.</p>
                    <Link to="#" className="btn btn-secondary">EMPTY CARD</Link>
                  </div>
                </div>
                <div className="card bg-light text-center" >
                  <div className="card-body">
                    <h5 className="card-title">Delete Group</h5>
                    <p className="card-text">This will delete the group and all data.</p>
                    <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">Delete Group</button>
                  </div>
                </div>
              </div>
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
              <h1 className="d-flex flex-wrap justify-content-center align-items-center display-4">Group Settings</h1>
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
};

const mapStateToProps = state => ({
  group: state.group
});

export default connect(mapStateToProps, { getGroupByHandle, deleteGroup })(
  Dashboard
);

