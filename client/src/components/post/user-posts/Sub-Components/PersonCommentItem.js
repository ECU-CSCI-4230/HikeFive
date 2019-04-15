import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deletePersonaNEWComment } from '../../../../actions/postActions';

class PersonCommentItem extends Component {
  onDeleteClick(postId, commentId) {
    this.props.deletePersonaNEWComment(postId, commentId);
  }

  render() {
    const { comment, postId, auth } = this.props;
    var moment = require('moment');
    var formatted_date = moment(comment.date).format('LLL');

    return (
      <div className="card card-body border-light mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="#">
              <img
                className="rounded-circle d-none d-md-block center"
                style={{ width: '50px' }}
                src={comment.avatar}
                alt=""
              />
            </a>
            <a className="d-flex justify-content-center">{comment.name}</a>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {comment.user === auth.user.id ? (
              <button
                onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                type="button"
                className="btn btn-sm btn-danger mr-1"
              >
                Delete
              </button>
            ) : null}
          </div>
          <div className="blockquote-footer bottomcorner" >{formatted_date}</div>
        </div>
      </div>
    );
  }
}

PersonCommentItem.propTypes = {
  deletePersonaNEWComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { deletePersonaNEWComment })(PersonCommentItem);
