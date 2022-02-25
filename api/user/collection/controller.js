const express = require("express")
const router = express.Router()
const model = require('./model');

// Gets collection 
router.get('/', (req, res) => {
    let user = req.query.user
    let collection = req.query.collection;
    console.log(req.query);

    // Check if client specified which collection they want
    if (collection){
        model.getCollection(user, collection).then((json) => {
            res.status(200).json({error: null, data: json});
        }).catch(err => {
            console.error('Collection Controller Error at getCollection', err);
            res.status(500).json({error: `Failed to get collection`, data: err.message})
        })
    }
    // If not, send all collection names
    else{
        model.getCollectionNames(user).then((names) => {
            res.status(200).json({error: null, data: names});
        }).catch(err => {
            console.error('Collection Controller Error at getCollectionNames', err);
            res.status(500).json({error: `Failed to get collection names`, data: err.message})
        })
    }
})

// Create collection
router.post('/', (req, res) => {
    let user = req.body.user
    let collection = req.body.collection;

    // model.createUser(user).then(() => {
    //     res.status(200).json({error: null, data: null});
    // }).catch(err => {
    //     console.error('User Controller Error at createUser', err);
    //     res.status(500).json({error: `Failed to create user`, data: err.message})
    // })
})

// Update collection
router.put('/', (req, res) => {
    let user = req.body.user
    let collection = req.body.collection;

    // model.createUser(user).then(() => {
    //     res.status(200).json({error: null, data: null});
    // }).catch(err => {
    //     console.error('User Controller Error at createUser', err);
    //     res.status(500).json({error: `Failed to create user`, data: err.message})
    // })
})

// Delete collection
router.delete('/', (req, res) => {
    let user = req.body.user
    let collection = req.body.collection;

    // model.createUser(user).then(() => {
    //     res.status(200).json({error: null, data: null});
    // }).catch(err => {
    //     console.error('User Controller Error at createUser', err);
    //     res.status(500).json({error: `Failed to create user`, data: err.message})
    // })
})

module.exports = router;