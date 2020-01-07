
let config = exports;

config.production = {
  appId: 'wxc464e493a4e946b6',
  appSecret: 'ab86e8264ed8c8a91df958a98a7928b4',

  //     appId: 'wxe27bcb44cb1e4753',
  //     appSecret: '920841d36776734b772f778cfa8c8b77',
};

config.testing = Object.assign({}, config.production);
config.development = Object.assign({}, config.production);

config.qa = Object.assign({}, config.testing, {});

config.nc = Object.assign({}, config.production, {});

config.sjhl = Object.assign({}, config.production, {});

config.gm = Object.assign({}, config.production, {});