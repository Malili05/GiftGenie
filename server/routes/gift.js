const express = require('express');
const Gift = require('../models/Gift'); 
const router = express.Router();

// GET route to fetch gifts based on keywords
router.get('/', async (req, res) => {
    try {
        const keywords = req.query.keywords || '';
        
        const gifts = await Gift.find({
            keywords: { $in: keywords.split(',') }
        });
        res.json(gifts);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
