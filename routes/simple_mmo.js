var express = require('express');
var router = express.Router();

const config = require('../core/config');
const access = config.simpleMMO.access;
const url = 'https://web.simple-mmo.com/';
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const moment = require('moment');

async function fetchGuild(id, page) {
  let status = html = false;
  let uri = `${url}guilds/view/${id}`;
  if (page) {
    uri += '/members?page=' + page;
  }
  await fetch(uri, access)
  .then(res => Promise.all([res.status, res.text()]))
  .then(([_status, _html]) => {
    status = _status;
    html = _html;
  });
  return [status, html];
}

function guildParse(html) {
  const $ = cheerio.load(html);
  const header = $(".background-image");
  const info = header.find("span").text();
  const img = url + header.find("p img").attr('src');
  const title = header.find("p").text().replace(info, '');
  const member = $(
    $($(".selectableRow").get(3)).find("div > span").get(1)
  );
  const countInfo = member.find("span").text();
  const count = member.text().replace(countInfo, '').trim();
  const guild = {
    info: info, img: img, title: title, count: count,
  };
  return guild;
}

function membersParse(html) {
  const members = [];
  const $ = cheerio.load(html);
  const els = $(
    ".col-md-8 > .kt-portlet.kt-portlet--mobile > "
    + ".kt-portlet__body > a"
  );
  els.each((i, e) => {
    let s = $(e).attr('onclick');
    s = s.replace(
      `if (!window.__cfRLUnblockHandlers) return false; showUser(`
      , ''
    ).replace(`);`, '');
    const es = s.split(',').map(
      e => e.replace(/^\'+|\'+$/g, '')
    );
    const dur = es[5].split(' ');
    es[7] = moment.duration(dur[0], dur[1]).asSeconds();
    members.push(es);
  });

  return members;
}

function checkIfDuplicateExists(w){
  return new Set(w).size !== w.length;
}

router.post('/guild/:id', async (req, res, next) => {
  const id = req.params.id;
  let status = false;
  let html = false;
  [status, html] = await fetchGuild(id);
  const data = {url: url, id: id};
  const guild = guildParse(html);

  let members = [];
  for (let i = 0; i < Math.ceil(guild.count/10); i++) {
    [status, html] = await fetchGuild(id, i + 1);
    const _members = membersParse(html);
    members = members.concat(_members);
  }
  if (checkIfDuplicateExists(members)) {
    const message = 'duplicated id members detected'
      + JSON.stringify(members)
    ;
    try {
      throw new Error('Error! ' + status + message);
    } catch (e) {
      next(e);
    }
  }

  const locals = {data: data, guild: guild, members: members};
  return res.json(locals);
});

router.get('/guild/:id', async (req, res, next) => {
  const id = req.params.id;
  if (!id) throw new Error('guild id required!');
  let status = false;
  let html = false;
  [status, html] = await fetchGuild(id);
  if (status !== 200) {
    let message = '';
    if (status === 500) {
      message = `: it seems that the guild id [${id}]`
        + ` doesn't exist`
      ;
    }
    try {
      throw new Error('Error! ' + status + message);
    } catch (e) {
      next(e);
    }
  }
  const data = {url: url, id: id};
  const locals = {data: data, guild: guildParse(html)};
  res.render('smmo/guild', locals);
});

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
