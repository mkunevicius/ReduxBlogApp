import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostShow extends Component {
  // accessing react router through context property:
  static contextTypes = {
    router: PropTypes.object
  };

  // get post (getting post id from URL)
  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }
  // delete post (getting post id from URL)
  onDeleteClick() {
    this.props.deletePost(this.props.params.id)
      .then(() => {
        // blog post has been deleted, navigate the user to '/':
        this.context.router.push('/');
      });
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <Link to='/'>Back To Index</Link>
        <button
          className='btn btn-danger pull-xs-right'
          onClick={this.onDeleteClick.bind(this)}>
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostShow);
