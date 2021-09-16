import config = require('config');

const dbConfig: any = config.get('db');
const serverConfig: any = config.get('server');
const jwtConfig: any = config.get('jwt');
const sendGridConfig: any = config.get('sendgrid');
const endPointConfig: any = config.get('endpoint');
const storageConfig: any = config.get('storage');
const convertConfig: any = config.get('convert');

export {
  config,
  dbConfig,
  serverConfig,
  jwtConfig,
  sendGridConfig,
  endPointConfig,
  storageConfig,
  convertConfig,
};
