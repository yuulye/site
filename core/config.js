let config = null;
const dir = '../configs/';
try {
  config = {
    main:   require(dir + 'main.json'),
    simpleMMO:   {
      access: require(dir + 'simpleMMO/access.json'),
    },
  };
} catch (e) {
  config = {
    main:   JSON.parse(process.env.main),
    simpleMMO:   {
      access: JSON.parse(process.env.simpleMMOAccess),
    },
  };
}

module.exports = config;
