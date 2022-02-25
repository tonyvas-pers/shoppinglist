const express = require("express")
const router = express.Router()
const model = require('./model');

// Get list of collection names
router.get('/', (req, res) => {
    model.getUserNamesList().then(names => {
        res.status(200).json({error: null, data: names});
    }).catch(err => {
        console.error('User Controller Error at getUserNamesList', err);
        res.status(500).json({error: `Failed to get user names`, data: err.message})
    })
})

// Create user
router.post('/', (req, res) => {
    let user = req.body.user

    model.createUser(user).then(() => {
        res.status(200).json({error: null, data: null});
    }).catch(err => {
        console.error('User Controller Error at createUser', err);
        res.status(500).json({error: `Failed to create user`, data: err.message})
    })
})

// Delete user
router.delete('/', (req, res) => {
    let user = req.body.user
    
    model.deleteUser(user).then(() => {
        res.status(200).json({error: null, data: null});
    }).catch(err => {
        console.error('User Controller Error at deleteUser', err);
        res.status(500).json({error: `Failed to delete user`, data: err.message})
    })
})

module.exports = router;