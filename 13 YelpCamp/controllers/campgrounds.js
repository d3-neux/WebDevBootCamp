const Campground = require('../models/campground');
const { cloudinary } = require("../cloudinary");

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const mapboxToken = process.env.MAPBOX_TOKEN;

const geocoder = mbxGeocoding({ accessToken: mapboxToken });






module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find();

    res.render('campgrounds/index', {campgrounds});
};


module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new');
}

module.exports.createCampground = async (req, res, next) => {
    // if (!req.body.campground) throw new ExpressError('Invalid campground data', 400)
    const geoData = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send();


    const campground = new Campground(req.body.campground);
    campground.geometry = geoData.body.features[0].geometry;
    campground.images = req.files.map(f => ({url: f.path, filename: f.filename}))
    campground.author = req.user._id
    console.log("NEW CAMPGROUND =====>" + campground);
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

    console.log(campground)


    return res.render('campgrounds/edit', { campground });
}


module.exports.editCampground = async (req, res) => {
    
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    campground.images.push(...req.files.map(f => ({ url: f.path, filename: f.filename })))
    
    await campground.save()
    if (req.body.deleteImages) {

        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }

        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
        console.log(campground);
    }
    req.flash('success', 'Succesfully updated campground');
    res.redirect(`${campground._id}`);
    
};

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndDelete(id);
    console.log(campground);
    req.flash('success', 'Succesfully deleted');
    res.redirect('/campgrounds');
    
};