const db = require('../lib/dbConnect');
// Your middleware MUST allow limit and offset to be sent
// via query parameters to the db for filtering

// default limit
const limit = 10;
// default offset
const offset = 0;

function getAllMovies(req, res, next) {
// implement get all movies
  db.any('SELECT * FROM movies;')
  .then((moviedata) => {
    res.rows = moviedata;
    next();
  })
  .catch(error => next(error));
}

function getMovie(req, res, next) {
// implement get single movie
  req.body.mID = Number.parseInt(req.params.movieID);
  db.one('SELECT * FROM movies WHERE id = $1', [req.body.mID])
  .then((onemovie) => {
    res.rows = onemovie;
    next();
  })
  .catch(error => next(error));
}

function updateMovie(req, res, next) {
// implement update
  req.body.mID = Number.parseInt(req.params.movieID);
  db.none(`
    UPDATE movies
    SET title = $/title/
    WHERE id = $/mID/;
    `, req.body)
  .then((updatedmovie) => {
    res.updated = updatedmovie;
    next();
  })
  .catch(error => next(error));
}

function deleteMovie(req, res, next) {
// implement delete
  req.body.mID = Number.parseInt(req.params.movieID);
  db.none('DELETE FROM movies WHERE id = $1', [req.body.mID])
  .then(() => {
    next();
  })
  .catch(error => next(error));
}


// BONUS
function getAllMoviesWithRatings(req, res, next) {
  db.any(`
    SELECT movies.title, ratings.rating
    FROM movies
    INNER JOIN ratings
      ON (movies.id = ratings.movie_id)
      LIMIT ${limit};
    `)
  .then((ratings) => {
    res.movies = ratings;
    next();
  })
  .catch(error => next(error));
}

module.exports = {
  getAllMovies,
  getMovie,
  updateMovie,
  deleteMovie,
  getAllMoviesWithRatings
};
