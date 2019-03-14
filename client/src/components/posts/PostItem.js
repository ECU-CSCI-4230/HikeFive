import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike} from '../../actions/postActions';
import CommentWindow from '../post/CommentWindow';
import CommentFeed from '../post/CommentFeed';
import CommentWindowForm from '../post/CommentWindowForm';



class PostItem extends React.Component {

  constructor() {
    super();
    this.state = {
      showReply: false,
      updated: false
    }
    this.updateLikes = this.updateLikes.bind(this);
    this.findUserLike = this.findUserLike.bind(this);
  }

  updateLikes(id) {

    const { post } = this.props;
    if(this.findUserLike(post.likes))
    {
      if(!this.state.updated) {
        post.likes.length = post.likes.length - 1;
        this.props.removeLike(id);
        this.setState((props) => {
          return {
            updated: true
          };
        });
      } else {
        this.props.addLike(id);
        post.likes.length = post.likes.length + 1;
        this.setState((props) => {
          return {
            updated: false
          };
        });
      }
    }
    else {
      if(!this.state.updated) {
        post.likes.length = post.likes.length + 1;
        this.props.addLike(id);
        this.setState((props) => {
         return {
           updated: true
          };
        });
      } else {
       //this.props.removeLike(id);
        post.likes.length = post.likes.length - 1;
        this.setState((props) => {
          return {
          updated: false
          };
        });
      }
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

    var moment = require('moment');
    var fomatted_date = moment(post.date).format('LLL');

    let commentsContent;
    if(post.comments.length <= 3)
    {
        commentsContent = <CommentFeed postId={post._id} comments={post.comments} />;
    } else {
        commentsContent = <CommentWindow postId={post._id} comments={post.comments} />;
    }


    return (

      <div className="d-flex card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a >
              <img
                style={{width: '75px'}}
                className="rounded-circle d-none d-md-block center"
                src={post.avatar}
                alt=""
              />
            </a>
            <a className="d-flex justify-content-center">{post.name}</a>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showActions ? (
              <span>
                <a>{post.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-sm btn-danger mr-1"
                  >
                    Delete
                  </button>
                ) : null} {" "}
                </a> 

                <Link to={`/post/${post._id}`} className="btn btn-sm btn-light mr-1">
                 View
                </Link>

                <button
                  onClick={this.updateLikes.bind(this, post._id)}
                  type="button"
                  className="btn btn-sm btn-light mr-1"
                >
                  <i
                    className={classnames('fas fa-thumbs-up', {
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>

                  <button 
                    onClick={this.onCommentsClick.bind(this, post._id)} 
                    type="button"
                    className="btn btn-sm btn-light mr-1"
                    href='#'>Comments
                  </button>

                  {this.state.showReply && commentsContent}
                  {this.state.showReply && <CommentWindowForm postId={post._id} />}

                <div class="blockquote-footer bottomcorner" >{fomatted_date}</div>
                
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
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

//React.render(<CommentWindow />, document.getElementById('app'))

export default connect(mapStateToProps, { deletePost, addLike, removeLike})(
  PostItem
);
