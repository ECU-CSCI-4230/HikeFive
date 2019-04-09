import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';
import SmallEvents from './SmallEvents';


class Popup extends React.Component {

  render() {
    console.log(this.props.group.group);
    const { group } = this.props.group;
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <SmallEvents group={group} />
        <button className="btn btn-dark" onClick={this.props.closePopup}>Close</button>
        </div>
      </div>
    );
  }
}

Popup.propTypes = {
  getGroupByHandle: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    group: state.group
});

export default connect(mapStateToProps)(Popup);