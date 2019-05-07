
import configSys from './ConfigSys';

// mysql://dbadm:Dbadm123!@128.75.229.79:3306/spwww
var coreDBSys = require('knex')(configSys.getCoreDBConfig());

export default coreDBSys;
