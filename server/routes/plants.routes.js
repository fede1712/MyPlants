const router = require("express").Router();

const mongoose = require("mongoose");

const User = require("../models/User.model");
const Plant = require('../models/Plant.model')

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

//Create a plant

router.post('/newPlant', isLoggedIn, (req, res) => {
    const { name, latinName, description, image, userId, irrigation, fertiliser } = req.body

    Plant
        .create({ name, latinName, description, image, userId, irrigation, fertiliser })
        .then(plant => res.status(200).json({ plant, message: 'Plant created' }))
        .catch(err => res.status(500).json({ code: 500, message: 'Error creting a plant', err }))
})


//Get all my plants
router.get('/', isLoggedIn, (req, res) => {
    Plant
        .find({ userId: req.session.user._id })
        .then(plant => res.status(200).json({ plant, message: 'Plants getted' }))
        .catch(err => res.status(500).json({ code: 500, message: 'Error getting plants', err }))

})

//Get my plant by ID
router.get('/:plantId', isLoggedIn, (req, res) => {
    const { plantId } = req.params
    Plant
        .findById(plantId)
        .then(plant => res.status(200).json({ plant, message: 'Plant getted' }))
        .catch(err => res.status(500).json({ code: 500, message: 'Error getting Plant', error: err.message }))
})

//Update Plant
router.put('/update/:plantId', (req, res) => {
    const { plantId } = req.params
    const { name, latinName, description, image, userId, irrigation, fertiliser } = req.body

    Plant
        .findByIdAndUpdate(plantId, name, latinName, description, image, userId, irrigation, fertiliser, { new: true })
        .then(plant => res.status(200).json({ plant, message: 'Plant edited' }))
        .catch(err => res.status(500).json({ code: 500, message: 'Error editing', err }))
})

//Delete Plant
router.delete('/delete/:plantId', isLoggedIn, (req, res) => {
    const { plantId } = req.params

    Plant
        .findByIdAndRemove(plantId)
        .then(() => res.status(200).json({ message: `Plant ${plantId} deleted` }))
        .catch(err => res.status(500).json({ code: 500, message: 'Error deleting plant', err }))
})

module.exports = router;
