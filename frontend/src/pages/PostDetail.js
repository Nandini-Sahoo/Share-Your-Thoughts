import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user, token } = useAuth();

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
      setPost(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      alert('Please login to like posts');
      return;
    }
    
    try {
      const res = await axios.put(
        `http://localhost:5000/api/posts/like/${id}`,
        {},
        { headers: { 'x-auth-token': token } }
      );
      setPost({ ...post, likes: res.data });
    } catch (err) {
      console.error(err);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please login to comment');
      return;
    }
    
    try {
      const res = await axios.post(
        `http://localhost:5000/api/posts/comment/${id}`,
        { text: comment },
        { headers: { 'x-auth-token': token } }
      );
      setPost({ ...post, comments: res.data });
      setComment('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`http://localhost:5000/api/posts/${id}`, {
          headers: { 'x-auth-token': token }
        });
        navigate('/');
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Helper function to get avatar URL
  const getAvatarUrl = (userPhoto, username) => {
    if (userPhoto && userPhoto !== '') {
      return userPhoto;
    }
    // Use your local avatar.jpeg as default
    return '/images/avatar.jpeg';
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!post) return <div className="loading">Post not found</div>;

  return (
    <div className="post-detail">
      <div className="post-header">
        <img 
          src={getAvatarUrl(post.author?.userPhoto, post.author?.username)} 
          alt={post.author?.username || 'User'}
          className="avatar"
          onError={(e) => {
            e.target.src = '/images/avatar.jpeg';
          }}
        />
        <div>
          <h3>{post.author?.username || 'Unknown User'}</h3>
          <small>Posted on {new Date(post.createdAt).toLocaleDateString()}</small>
          {post.createdAt !== post.updatedAt && (
            <small> (Edited on {new Date(post.updatedAt).toLocaleDateString()})</small>
          )}
        </div>
        {isAuthenticated && user?.id === post.author?._id && (
          <div className="post-actions">
            <button onClick={() => navigate(`/edit-post/${id}`)}>Edit</button>
            <button onClick={handleDelete} className="delete-btn">Delete</button>
          </div>
        )}
      </div>
      
      <div className="post-body">
        <h1>{post.title}</h1>
        <div className="post-category">
          <span className="category-badge">{post.category}</span>
        </div>
        <p>{post.content}</p>
      </div>
      
      <div className="post-stats">
        <button onClick={handleLike} className="like-btn">
          ❤️ {post.likes?.length || 0} Likes
        </button>
      </div>
      
      <div className="comments-section">
        <h3>Comments ({post.comments?.length || 0})</h3>
        
        {isAuthenticated && (
          <form onSubmit={handleComment} className="comment-form">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts..."
              required
              rows="3"
            />
            <button type="submit">Post Comment</button>
          </form>
        )}
        
        <div className="comments-list">
          {post.comments && post.comments.length > 0 ? (
            post.comments.map(comment => (
              <div key={comment._id} className="comment">
                <img 
                  src={getAvatarUrl(comment.user?.userPhoto, comment.user?.username)} 
                  alt={comment.user?.username}
                  onError={(e) => {
                    e.target.src = '/images/avatar.jpeg';
                  }}
                />
                <div>
                  <strong>{comment.user?.username || 'Unknown User'}</strong>
                  <p>{comment.text}</p>
                  <small>{new Date(comment.createdAt).toLocaleDateString()}</small>
                </div>
              </div>
            ))
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;