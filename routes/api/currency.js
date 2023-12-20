// routes.js

const express = require('express');
const router = express.Router();
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

// Route to handle autocomplete search
// router.route('/search-currencies')
// get ( async (req, res) => {
//     try {
//       const inputText = req.query.text;
//       if (inputText.length >= 2) {
//         const response = await axios.get(`https://api.coingecko.com/api/v3/coins/list?include_platform=false`);
//         const filteredData = response.data.filter(item => item.symbol.toLowerCase().includes(inputText.toLowerCase()));
//         const suggestions = filteredData.map(item => item.symbol);
//         res.json(suggestions);
//       } else {
//         res.json([]); // Return an empty array if input length is less than 2
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       res.status(500).json({ error: 'Server error' });
//     }
// });

// Other routes and controller logic
module.exports = router;
