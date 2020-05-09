import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';

import * as config from '@/config/sequelize';

// Configuration
const env = process.env.NODE_ENV;
const sequelizeConfig = config[env];

// Create sequelize instance
const sequelize = new Sequelize(sequelizeConfig);

// Import all model files
const modelsPath = `${__dirname}/models`;

fs
  .readdirSync(modelsPath)
  .filter((file) => (file.indexOf('.') !== 0) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    sequelize.import(path.join(modelsPath, file));
  });

export default sequelize;
