import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

class CommentWindow extends Component {
  render() {
    const { comments, postId } = this.props;

    return comments.reverse().map(comment => (
      <CommentItem key={comment._id} comment={comment} postId={postId} />
    ));
  }
}

CommentWindow.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired
};

export default CommentWindow;