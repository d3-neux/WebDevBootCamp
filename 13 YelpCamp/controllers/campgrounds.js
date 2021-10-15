const Campground = require('../models/campground');


module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find();

    res.render('campgrounds/index', {campgrounds});
};


module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new');
}

module.exports.createCampground = async (req, res, next) => {
    // if (!req.body.campground) throw new ExpressError('Invalid campground data', 400)

    const campground = new Campground(req.body.campground);
    campground.author = req.user._id
    console.log(campground);
    await campground.save();

    req.flash('success', 'Succesfully saved');
    res.redirect(`/campgrounds/${campground._id}`);
};


module.exports.showCampground = async (req, res, next) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    
    console.log(campground);
    if (!campground) {
        throw new ExpressError('not found', 404);
    }

    res.render('campgrounds/show', { campground });
};


module.exports.renderEditForm = async (req, res, next) => {
    const campground = await Campground.findById(req.params.id);

    if (!campground) {
        req.flash('error', 'Cannot find campground');
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/edit', { campground });
}


module.exports.editCampground = async (req, res) => {
    
    
    const { id } = req.params;

    const camp = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    
    req.flash('success', 'Succesfully updated campground');
    res.redirect(`${camp._id}`);
    
};

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndDelete(id);
    console.log(campground);
    req.flash('success', 'Succesfully deleted');
    res.redirect('/campgrounds');
    
};