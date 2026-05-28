const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { username, bio, userPhoto } = req.body;
    
    const user = await User.findById(req.user.id);
    
    if (username) user.username = username;
    if (bio) user.bio = bio;
    if (userPhoto) user.userPhoto = userPhoto;
    
    await user.save();
    
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      userPhoto: user.userPhoto,
      bio: user.bio
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get user posts
router.get('/:userId/posts', async (req, res) => {
  try {
    const Post = require('../models/Post');
    const posts = await Post.find({ author: req.params.userId })
      .populate('author', 'username userPhoto')
      .sort({ createdAt: -1 });
    
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;