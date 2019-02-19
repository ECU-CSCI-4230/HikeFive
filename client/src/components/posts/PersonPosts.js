import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PersonPostForm from './PersonPostForm';
import PersonPostFeed from './PersonPostFeed';
import Spinner from '../common/Spinner';
import {getPersonalPosts, getPosts } from '../../actions/postActions';


class PersonPosts extends Component {
    componentDidMount() {
        this.props.getPersonalPosts(this.props.match.params.handle);
      }

  render() {
    //console.log(this.props.match.params.handle);
    const { posts, loading } = this.props.post;
    let postContent;
    const handle = this.props.match.params.handle;
    //console.log(handle);
    //console.log(posts);
    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PersonPostFeed handle = {handle} posts={posts} />;
    }

    return (
      <div className="personfeed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PersonPostForm handle = {handle}/>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PersonPosts.propTypes = {
    getPersonalPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
  };

  const mapStateToProps = state => ({
    post: state.post
  });

export default connect(mapStateToProps, {getPersonalPosts})(PersonPosts);
