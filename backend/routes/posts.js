const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get all posts (public - anyone can read)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username userPhoto')
      .populate('comments.user', 'username userPhoto')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username userPhoto')
      .populate('comments.user', 'username userPhoto');
    
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create post (registered users only)
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, category } = req.body;
    
    const newPost = new Post({
      title,
      content,
      category,
      author: req.user.id
    });
    
    const post = await newPost.save();
    const populatedPost = await Post.findById(post.id)
      .populate('author', 'username userPhoto');
    
    res.json(populatedPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update post (owner only)
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, content, category } = req.body;
    
    let post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    
    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    
    post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, category, updatedAt: Date.now() },
      { new: true }
    ).populate('author', 'username userPhoto');
    
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete post (owner only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    
    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    
    await post.deleteOne();
    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Like/unlike post (anyone can like)
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    
    if (post.likes.includes(req.user.id)) {
      // Unlike
      post.likes = post.likes.filter(id => id.toString() !== req.user.id);
    } else {
      // Like
      post.likes.push(req.user.id);
    }
    
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add comment (registered users only)
router.post('/comment/:id', auth, async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    
    const newComment = {
      user: req.user.id,
      text
    };
    
    post.comments.push(newComment);
    await post.save();
    
    const updatedPost = await Post.findById(req.params.id)
      .populate('author', 'username userPhoto')
      .populate('comments.user', 'username userPhoto');
    
    res.json(updatedPost.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;