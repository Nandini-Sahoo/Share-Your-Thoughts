import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import PostCard from '../components/PostCard';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated, token } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/posts`);
      console.log('Fetched posts:', res.data); // Debug log
      setPosts(res.data);
      setError('');
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    if (!isAuthenticated) {
      alert('Please login to like posts');
      return;
    }
    
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/posts/like/${postId}`,
        {},
        { headers: { 'x-auth-token': token } }
      );
      setPosts(posts.map(post => 
        post._id === postId ? { ...post, likes: res.data } : post
      ));
    } catch (err) {
      console.error(err);
      alert('Error liking post');
    }
  };

  if (loading) return <div className="loading">Loading posts...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home">
      <div className="hero-section">
        <h1>Share Your Thoughts</h1>
        <p>Express your experiences, thoughts, and special moments with the world</p>
        {isAuthenticated && (
          <button onClick={() => window.location.href='/create-post'} style={{marginTop: '20px'}}>
            Share Your Story
          </button>
        )}
      </div>
      
      {posts.length === 0 ? (
        <div style={{textAlign: 'center', color: 'white', padding: '50px'}}>
          <h3>No posts yet. Be the first to share your thoughts!</h3>
          {isAuthenticated && (
            <button onClick={() => window.location.href='/create-post'} style={{marginTop: '20px'}}>
              Create First Post
            </button>
          )}
        </div>
      ) : (
        <div className="posts-grid">
          {posts.map(post => (
            <PostCard key={post._id} post={post} onLike={handleLike} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;