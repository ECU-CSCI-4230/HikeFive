import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import Spinner from '../common/Spinner';
import { getPost } from '../../actions/postActions';

class CommentWindow extends Component {

  render() {

    const { post, loading } = this.props.post;
    let postContent;

    if (post === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          <CommentForm postId={post._id} />
          <CommentFeed postId={post._id} comments={post.comments} />
        </div>
      );
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="fb-comments"
                data-href={this.props.url}
                data-width="100%"
                data-numposts="10"
                data-order-by="reverse_time">
            </div>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CommentWindow.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(CommentWindow);
