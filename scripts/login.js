const fetch = require('node-fetch');

fetch("https://web.simple-mmo.com/", {})
  .then(res => res.text())
  .then(body => console.log(body))
;
