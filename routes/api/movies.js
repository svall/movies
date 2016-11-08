const express = require('express');
const router = express.Router();
const { getAllMovies, getMovie, deleteMovie, updateMovie, getAllMoviesWithRatings } = require('../../models/movie');

// Get movies withrating BONUS
router.get('/ratings', getAllMoviesWithRatings, (req, res) => {
  res.json(res.movies);
})

// Get single movie
router.get('/:movieID', getMovie, (req, res) => {
  res.json(res.rows);
})

// Delete movies
router.delete('/:movieID', deleteMovie, (req, res) => {
  // res.json(`Deleted ${req.params.movieID}`);
  res.status(204).send();
})

// Update movie
// In postman: Body, raw, JSON enter in object {"title": "New Title"}
router.put('/:movieID', updateMovie, (req, res) => {
  res.status(204).send();
})

// get all movies
// /api/movies
router.get('/', getAllMovies, (req, res) => {
  res.json(res.rows);
})

module.exports = router;
