import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import PersonPostItem from '../posts/PersonPostItem';
import PersonCommentForm from './PersonCommentForm';
import PersonCommentFeed from './PersonCommentFeed';
import Spinner from '../common/Spinner';
import { getPersonalPost } from '../../actions/postActions';

class PersonPost extends Component {
  componentDidMount() {
    this.props.getPersonalPost(this.props.match.params.id);
  }

  render() {
    const { post, loading } = this.props.post;
    let postContent;
    const currenturl =window.location.href;
    const splitUrl = currenturl.split("/");
    const backToFeedUrl = "personfeed"+"/"+splitUrl[4];

    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          <PersonPostItem post={post} showActions={false} />
          <PersonCommentForm postId={post._id} />
          <PersonCommentFeed postId={post._id} comments={post.comments} />
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
              <Link to={`/${backToFeedUrl}`}className="btn btn-light mb-3">
                Back To Feed
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PersonPost.propTypes = {
  getPersonalPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPersonalPost })(PersonPost);
