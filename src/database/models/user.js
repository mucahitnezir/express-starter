import { DataTypes, Model } from 'sequelize';

export default function (sequelize) {
  class User extends Model {}

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

  return User;
}
