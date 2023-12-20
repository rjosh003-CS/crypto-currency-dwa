// routes.js

const express = require('express');
const router = express.Router();
const axios = require('axios');
const currencyModel = require('../../mvc/service/external_api/fetchCurrencies');

// Route to fetch all currencies
router.route('/currencies')
.get( async (req, res) => {
  try {
    const currencies = await currencyModel.fetchAllCurrencies();
    res.json(currencies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route for auto-completion search
router.get('/search', async (req, res) => {
  try {
    const query = req.query.q;
    const searchResults = await currencyModel.searchCurrencies(query);
    res.json(searchResults);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Other routes and controller logic
module.exports = router;
