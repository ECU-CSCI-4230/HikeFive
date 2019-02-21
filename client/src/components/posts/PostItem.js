import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addLike} from '../../actions/postActions';
import CommentWindow from '../post/CommentWindow';
import CommentFeed from '../post/CommentFeed';
import CommentWindowForm from '../post/CommentWindowForm';



class PostItem extends React.Component {

  constructor() {
    super();
    this.state = {
      showReply: false
    }
  }


  onCommentsClick() {
    //e.preventDefault();
    this.setState({showReply: !this.state.showReply})
  }

  
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { post, auth, showActions } = this.props;

    const showHide = {
      'display': this.state.showStatus ? 'block' : 'none'
    };

    const showReplyForm = () => {
      this.setState({showForm: true});
    };

    let commentsContent;
    if(post.comments.length <= 3)
    {
        commentsContent = <CommentFeed postId={post._id} comments={post.comments} />;
    } else {
        commentsContent = <CommentWindow postId={post._id} comments={post.comments} />;
    }


    return (

      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showActions ? (
              <span>

                <button
                  onClick={this.onLikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames('fas fa-thumbs-up', {
                      'text-info': this.findUserLike(post.likes)
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>

                
                  <button 
                    onClick={this.onCommentsClick.bind(this, post._id)} 
                    type="button"
                    className="btn btn-light mr-1"
                    href='#'>Comments
                  </button>

                  {this.state.showReply && commentsContent}
                  {this.state.showReply && <CommentWindowForm postId={post._id} />}


                <div>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Go to Current Post
                </Link>
                </div>

              
                {post.user === auth.user.id ? (
                  
                  <button
                    onClick={this.onDeleteClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
                
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}


PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

//React.render(<CommentWindow />, document.getElementById('app'))

export default connect(mapStateToProps, { deletePost, addLike})(
  PostItem
);

