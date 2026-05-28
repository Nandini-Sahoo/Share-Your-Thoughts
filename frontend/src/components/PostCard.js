import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PostCard = ({ post, onLike }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!post) return null;
  
  const isLiked = isAuthenticated && user && post.likes && post.likes.includes(user.id);
  const likeCount = post.likes ? post.likes.length : 0;
  const commentCount = post.comments ? post.comments.length : 0;
  
  const getAvatarUrl = (userPhoto, username) => {
    if (userPhoto && userPhoto !== '') {
      return userPhoto;
    }
    return '/images/avatar.jpeg';
  };
  
  return (
    <div className="post-card">
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
          <small>{new Date(post.createdAt).toLocaleDateString()}</small>
        </div>
      </div>
      <div className="post-content">
        <h2>{post.title}</h2>
        <p>{post.content?.substring(0, 200) || ''}...</p>
        <Link to={`/post/${post._id}`} className="read-more">Read More</Link>
      </div>
      <div className="post-footer">
        <button onClick={() => onLike(post._id)} className="like-btn">
          ❤️ {likeCount} {likeCount === 1 ? 'Like' : 'Likes'}
        </button>
        <span>💬 {commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}</span>
      </div>
    </div>
  );
};

export default PostCard;