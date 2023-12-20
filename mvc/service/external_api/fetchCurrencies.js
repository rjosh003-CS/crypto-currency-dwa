// models/currencyModel.js
const axios = require('axios');

function fetchAllCurrencies() {
  const apiUrl = 'https://api.coingecko.com/api/v3/coins/list';
  return axios.get(apiUrl).then(response => response.data);
}

let allCurrenciesPromise = null;

function fetchAllCurrenciesOnce() {
  if (!allCurrenciesPromise) {
    allCurrenciesPromise = fetchAllCurrencies();
  }
  return allCurrenciesPromise;
}

function searchCurrencies(query) {
  return fetchAllCurrenciesOnce().then(currencies => {
    const filteredCurrencies = currencies.filter(currency =>
      currency.name.toLowerCase().includes(query.toLowerCase())
    );
    return filteredCurrencies;
  });
}

module.exports = {
  fetchAllCurrencies,
  searchCurrencies
  // Other functions related to currency operations
};
