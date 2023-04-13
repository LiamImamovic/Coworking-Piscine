// const { Op, UniqueConstraintError, ValidationError } = require('sequelize');
const { ReviewModel } = require('../db/sequelize');


exports.findAllReviews = (req, res) => {
    ReviewModel.findAll()
        .then(results => {
            const msg = "La liste des avis a bien été récupérée"
            res.json({message: msg, data: results})
        })
        .catch(err => {
            const msg = "La liste des avis n'a pas pu être récupérée"
            res.status(500).json({message: msg, data: err})
        })
}


exports.createReview = (req, res) => {
    ReviewModel.create({
        content: req.body.content,
        rating: req.body.rating
    })
        .then(result => {
            const msg = "L'avis a bien été créé"
            res.json({message: msg, data: result})
        })
        .catch(err => {
            const msg = "L'avis n'a pas pu être créé"
            res.status(500).json({message: msg, data: err})
        })
}


