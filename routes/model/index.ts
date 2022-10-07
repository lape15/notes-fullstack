const configDb = require('../../db/config');
import {Sequelize} from 'sequelize';

const sequilize = new Sequelize(configDb.development);

const db = {
  Sequelize,
  sequilize,
};
db.sequilize
  .sync({force: false})
  .then(() => console.log('DB is synced'))
  .catch(err => console.log(err, 'error here ', err.message));

export default db;
