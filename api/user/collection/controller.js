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

    model.createCollection(user, collection).then(() => {
        res.status(200).json({error: null, data: null});
    }).catch(err => {
        console.error('Collection Controller Error at createCollection', err);
        res.status(500).json({error: `Failed to create collection`, data: err.message})
    })
})

// Update collection
router.put('/', (req, res) => {
    let user = req.body.user
    let collection = req.body.collection;
    let data = req.body.data;

    model.updateCollection(user, collection, data).then(() => {
        res.status(200).json({error: null, data: null});
    }).catch(err => {
        console.error('Collection Controller Error at updateCollection', err);
        res.status(500).json({error: `Failed to update collection`, data: err.message})
    })
})

// Delete collection
router.delete('/', (req, res) => {
    let user = req.body.user
    let collection = req.body.collection;

    model.deleteCollection(user, collection).then(() => {
        res.status(200).json({error: null, data: null});
    }).catch(err => {
        console.error('Collection Controller Error at deleteCollection', err);
        res.status(500).json({error: `Failed to delete collection`, data: err.message})
    })
})

module.exports = router;