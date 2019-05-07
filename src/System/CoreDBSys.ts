
import configSys from './ConfigSys';

var coreDBSys = require('knex')(configSys.getPgDBConfig());

export default coreDBSys;
