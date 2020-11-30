var express = require('express');
var router = express.Router();
const data = require(
  '../data/countries-code-currency.json'
);

const config = require('../core/config');
const fetch = require('node-fetch');

/* GET home page. */
router.get('/', (req, res, next) => {

  // todo: fetch database if exist, fetch api if not

  const countries = [];
  for (let i = 0; i < data.countries.country.length; i++) {
    const o = data.countries.country[i];
    const c = {
      code: o.countryCode,
      name: o.countryName,
      curr: o.currencyCode,
    };
    c.rate = getRate(c.curr);
    countries.push(c);
  }

  res.render('currency-converter', {
    countries: countries,
    rates: rates,
  });
});

function getRate(curr) {
  if (!rates.success) {
    throw new Error('Rates data not valid!');
  }

  return rates.rates[curr];
}

module.exports = router;

const rates = 
{
  "success":true,
  "timestamp":1606745044,
  "base":"EUR",
  "date":"2020-11-30",
  "rates":{
    "AED":4.404087,
    "AFN":92.288493,
    "ALL":124.151783,
    "AMD":607.1958,
    "ANG":2.152698,
    "AOA":782.55406,
    "ARS":97.479655,
    "AUD":1.624388,
    "AWG":2.15829,
    "AZN":2.03807,
    "BAM":1.956646,
    "BBD":2.42141,
    "BDT":101.70452,
    "BGN":1.959004,
    "BHD":0.451709,
    "BIF":2323.959302,
    "BMD":1.19905,
    "BND":1.603469,
    "BOB":8.269049,
    "BRL":6.350291,
    "BSD":1.1993,
    "BTC":6.2300086e-5,
    "BTN":88.676186,
    "BWP":13.244424,
    "BYN":3.105895,
    "BYR":23501.382205,
    "BZD":2.417408,
    "CAD":1.551685,
    "CDF":2363.327764,
    "CHF":1.084313,
    "CLF":0.033378,
    "CLP":920.76701,
    "CNY":7.886873,
    "COP":4313.462875,
    "CRC":724.172045,
    "CUC":1.19905,
    "CUP":31.774828,
    "CVE":110.31101,
    "CZK":26.236399,
    "DJF":213.499048,
    "DKK":7.44013,
    "DOP":69.558012,
    "DZD":154.749512,
    "EGP":18.776985,
    "ERN":17.985839,
    "ETB":45.882337,
    "EUR":1,
    "FJD":2.479996,
    "FKP":0.897069,
    "GBP":0.896728,
    "GEL":3.974823,
    "GGP":0.897069,
    "GHS":7.027731,
    "GIP":0.897069,
    "GMD":62.050683,
    "GNF":11805.023764,
    "GTQ":9.37531,
    "GYD":251.284809,
    "HKD":9.294371,
    "HNL":29.050117,
    "HRK":7.554855,
    "HTG":79.353097,
    "HUF":359.666907,
    "IDR":16978.789403,
    "ILS":3.966265,
    "IMP":0.897069,
    "INR":88.736243,
    "IQD":1431.707152,
    "IRR":50486.005545,
    "ISK":158.789695,
    "JEP":0.897069,
    "JMD":175.831338,
    "JOD":0.850117,
    "JPY":124.882245,
    "KES":132.01631,
    "KGS":101.676097,
    "KHR":4881.636084,
    "KMF":493.984984,
    "KPW":1079.191361,
    "KRW":1327.072604,
    "KWD":0.36673,
    "KYD":0.999417,
    "KZT":510.522934,
    "LAK":11118.437395,
    "LBP":1813.256292,
    "LKR":222.825338,
    "LRD":188.58062,
    "LSL":18.296915,
    "LTL":3.540483,
    "LVL":0.725294,
    "LYD":1.622577,
    "MAD":10.888942,
    "MDL":20.687529,
    "MGA":4535.291627,
    "MKD":61.625285,
    "MMK":1577.046971,
    "MNT":3429.708482,
    "MOP":9.575194,
    "MRO":428.061507,
    "MUR":47.781798,
    "MVR":18.461417,
    "MWK":912.085422,
    "MXN":24.078845,
    "MYR":4.884953,
    "MZN":88.975555,
    "NAD":18.297277,
    "NGN":462.622956,
    "NIO":41.794432,
    "NOK":10.547804,
    "NPR":141.882178,
    "NZD":1.701935,
    "OMR":0.461044,
    "PAB":1.1993,
    "PEN":4.317301,
    "PGK":4.22006,
    "PHP":57.734524,
    "PKR":191.164433,
    "PLN":4.476606,
    "PYG":8454.32622,
    "QAR":4.365442,
    "RON":4.873059,
    "RSD":117.578194,
    "RUB":91.299301,
    "RWF":1186.02468,
    "SAR":4.496876,
    "SBD":9.594857,
    "SCR":24.952939,
    "SDG":66.297939,
    "SEK":10.174348,
    "SGD":1.603166,
    "SHP":0.897069,
    "SLL":12005.489522,
    "SOS":699.046148,
    "SRD":16.971368,
    "STD":25218.309275,
    "SVC":10.494377,
    "SYP":615.038436,
    "SZL":18.323743,
    "THB":36.294024,
    "TJS":13.584766,
    "TMT":4.196675,
    "TND":3.284803,
    "TOP":2.742348,
    "TRY":9.34,
    "TTD":8.147298,
    "TWD":34.221491,
    "TZS":2781.119984,
    "UAH":34.173353,
    "UGX":4440.952279,
    "USD":1.19905,
    "UYU":51.155336,
    "UZS":12425.692639,
    "VEF":11.975512,
    "VND":27754.576172,
    "VUV":133.498749,
    "WST":3.060769,
    "XAF":656.230708,
    "XAG":0.054137,
    "XAU":0.000676,
    "XCD":3.240493,
    "XDR":0.841451,
    "XOF":656.230708,
    "XPF":120.205092,
    "YER":300.119647,
    "ZAR":18.453238,
    "ZMK":10792.89277,
    "ZMW":25.184804,
    "ZWL":386.094065
  }
};
