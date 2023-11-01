// Express Router Configuration for Main API Routes
const router = require('express').Router();

// Sub-routes for users, posts, and comments
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

// Sub-routes for specific API endpoints
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes)

module.exports = router;