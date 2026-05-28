import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Check if token exists
    if (!token) {
      setError('Please login to create a post');
      setLoading(false);
      return;
    }
    
    try {
      console.log('Sending post with token:', token); // Debug log
      
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/posts`, 
        formData,
        {
          headers: { 
            'x-auth-token': token,
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('Post created:', response.data); // Debug log
      navigate('/');
    } catch (err) {
      console.error('Error details:', err.response || err);
      setError(err.response?.data?.msg || 'Error creating post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-form">
      <h2>Create New Post</h2>
      {error && <div className="error" style={{color: 'red', padding: '10px', margin: '10px 0', background: '#ffeeee', borderRadius: '5px'}}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="general">General</option>
            <option value="thought">Thought</option>
            <option value="experience">Experience</option>
            <option value="event">Event</option>
          </select>
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows="8"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;