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
const models = {};
const modelsPath = `${__dirname}/models`;

fs
  .readdirSync(modelsPath)
  .filter((file) => (file.indexOf('.') !== 0) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(modelsPath, file));
    models[model.name] = model;
  });

// Associations
Object.keys(models)
  .forEach((modelName) => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });

export default sequelize;
