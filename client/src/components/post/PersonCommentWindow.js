import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PersonCommentItem from './PersonCommentItem';

class CommentWindow extends Component {
  constructor() {
    super()
    
    this.state = {
      itemsToShow: 3,
      expanded: false
    }

    this.showMore = this.showMore.bind(this);
  }

  showMore() {

  	const { comments, postId } = this.props;


    this.state.itemsToShow === 3 ? (
      this.setState({ itemsToShow: comments.length, expanded: true })
    ) : (
      this.setState({ itemsToShow: 3, expanded: false })
    )
  }

  render() {
    const { comments, postId } = this.props;

    return(
    	<div className="container">
                 {comments.slice(0,this.state.itemsToShow).map((comment,i) => 
    		<li key={i}> <PersonCommentItem key={comment._id} comment={comment} postId={postId} /> </li>
          )}
      
      <p>
        <a className="btn btn-light mr-1" onClick={this.showMore} >
          {this.state.expanded ? (
             <span>Show less</span>
           ) : (
             <span>Show more</span>
           )
          }
        </a>
      </p>
    </div>);
  }
}

CommentWindow.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired
};


export default CommentWindow;