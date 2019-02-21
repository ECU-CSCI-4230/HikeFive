import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePersonalPost, addPersonalLike} from '../../actions/postActions';
import PersonCommentWindow from '../post/PersonCommentWindow';
import PersonCommentFeed from '../post/PersonCommentFeed';
import PersonCommentWindowForm from '../post/PersonCommentWindowForm';



class PersonPostItem extends React.Component {

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
    this.props.deletePersonalPost(id);
  }

  onLikeClick(id) {
    this.props.addPersonalLike(id);
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
    const handle = this.props.handle;
  
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
        commentsContent = <PersonCommentFeed postId={post._id} comments={post.comments} />;
    } else {
        commentsContent = <PersonCommentWindow postId={post._id} comments={post.comments} />;
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
                  {this.state.showReply && <PersonCommentWindowForm postId={post._id} />}


                <div>
                <Link to={`/post/${handle}/${post._id}`} className="btn btn-info mr-1">
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

                <div class="bottomcorner" >{fomatted_date}</div>
                
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}


PersonPostItem.defaultProps = {
  showActions: true
};

PersonPostItem.propTypes = {
  deletePersonalPost: PropTypes.func.isRequired,
  addPersonalLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

//React.render(<CommentWindow />, document.getElementById('app'))

export default connect(mapStateToProps, { deletePersonalPost, addPersonalLike})(
  PersonPostItem
);

