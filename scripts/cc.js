const data = require(
  '../data/countries-code-currency.json'
);
const fetch = require('node-fetch');

/*
(async () => {
  const response = await fetch(
    'http://data.fixer.io/api/latest?access_key='
    + 'key-on:fixer.io&format=1'
  );
  const json = await response.json();
  console.log(json);
})();
*/

console.log(data, rates);
