import { compareSync, hashSync } from 'bcrypt';
import { DataTypes, Model } from 'sequelize';

import { tokenHelper } from '../../helpers';

export default function (sequelize) {
  class User extends Model {
    generateToken() {
      const data = { id: this.id, email: this.email };
      return tokenHelper.generateToken(data);
    }

    validatePassword(plainPassword) {
      return compareSync(plainPassword, this.password);
    }
  }

  User.init({
    firstName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    modelName: 'user',
    sequelize,
  });

  User.addHook('beforeSave', (instance) => {
    if (instance.changed('password')) {
      // eslint-disable-next-line no-param-reassign
      instance.password = hashSync(instance.password, 10);
    }
  });

  return User;
}
