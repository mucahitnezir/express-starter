import { Sequelize } from 'sequelize';

import * as config from '../config/sequelize';

// Configuration
const env = process.env.NODE_ENV || 'development';
const sequelizeConfig = config[env];

const sequelize = new Sequelize(sequelizeConfig);

sequelize.import('./models/user');

export default sequelize;
