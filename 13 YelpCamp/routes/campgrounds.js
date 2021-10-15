const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/CatchAsync')
const campgrounds = require('../controllers/campgrounds');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware')

// const ExpressError = require('../utils/ExpressError')
// const Campground = require('../models/campground');

router.route('/')
    .get(catchAsync(campgrounds.index))
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground))

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.editCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

router.get('/id:/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

module.exports = router



// router.get('/', catchAsync(campgrounds.index));

// router.get('/new', isLoggedIn, campgrounds.renderNewForm);

// router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));

// router.get('/:id', catchAsync(campgrounds.showCampground));

// router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

// router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.editCampground));

// router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))
