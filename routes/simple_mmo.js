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
      const player = {
        name: name[4],
        level: Number(name[5].split(' ')[1]),
      };
      data.players.push(player);
    });
  }
  res.render('smmo', data);
});

module.exports = router;
