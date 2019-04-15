import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PersonPostItem from './Main-Components/PersonPostItem';
import PersonCommentForm from './Main-Components/PersonCommentForm';
import PersonCommentFeed from './Main-Components/PersonCommentFeed';
import Spinner from '../../common/Spinner';
import { getPersonalPost } from '../../../actions/postActions';

class PersonPost extends Component {
  componentDidMount() {
    this.props.getPersonalPost(this.props.match.params.id);
  }

  render() {
    const { post, loading } = this.props.post;
    const currenturl = window.location.href;
    const splitUrl = currenturl.split("/");
    const backToFeedUrl = "Wall" + "/" + splitUrl[4];

    let postContent;

    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          <PersonPostItem post={post} showActions={false} />
          <PersonCommentFeed postId={post._id} comments={post.comments} />
          <PersonCommentForm postId={post._id} />
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
              <Link to={`/${backToFeedUrl}`} className="btn btn-light mb-3">
                Back To Wall
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
