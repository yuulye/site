var express = require('express');
var router = express.Router();

const config = require('../core/config');
const url = 'https://web.simple-mmo.com/';
const fetch = require('node-fetch');
const cheerio = require('cheerio');

router.get('/', async function(req, res, next) {
  const data = {players: []};
  const players = [
    /*
    359337,
    302452,
    */

    /*
    443173,
    491653,
    489027,
    */

    497281, 
    496228,
    497363,
    495485,
    496412,

    496003,
    497367,
  ];

  for (let i = 0; i < players.length; i++) {
    const o = players[i];
    await fetch(`${url}user/view/${o}`, config.simpleMMO.access)
    .then(res => res.text())
    .then(body => {
      const $ = cheerio.load(body);
      const name = $(".kt-user-card__name").text().split('\n');
      const attrs = $(".kt-widget31__item");
      const steps = $($(attrs.get(7)).find("span").get(1)).text();
      const player = {
        id: o,
        name: name[4],
        level: Number(name[5].split(' ')[1]),
        steps: steps,
      };
      data.players.push(player);
    });
  }
  /*
  console.log(data.players);
  */

  /*
  data.players = [
  { id: 497281, name: '[PTB] yuulye ', level: 36, steps: '1,005' },
  { id: 496228, name: '[PTB] L33Kx  ', level: 36, steps: '1,278' },
  { id: 497363, name: '[PTB] Parakalix  ', level: 34, steps: '1,157' },
  { id: 495485, name: '[PTB] Jadus Katarn ', level: 25, steps: '775' },
  { id: 496412, name: '[PTB] Van  ', level: 37, steps: '1,387' },
  { id: 496003, name: '[PTB] Griffin ', level: 17, steps: '483' },
  { id: 497367, name: '[PTB] Ťhįçç ', level: 21, steps: '850' }
];

  data.players = [
  { id: 497281, name: '[PTB] yuulye ', level: 36},
  { id: 496228, name: '[PTB] L33Kx  ', level: 36},
  { id: 497363, name: '[PTB] Parakalix  ', level: 34},
  { id: 495485, name: '[PTB] Jadus Katarn ', level: 25},
  { id: 496412, name: '[PTB] Van  ', level: 37},
  { id: 496003, name: '[PTB] Griffin ', level: 17},
  { id: 497367, name: '[PTB] Ťhįçç ', level: 21}
];
*/

  res.render('smmo', data);
});

module.exports = router;
