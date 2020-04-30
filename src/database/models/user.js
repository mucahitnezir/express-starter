import { DataTypes, Model } from 'sequelize';

export default function (sequelize) {
  class User extends Model {}

  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    modelName: 'user',
    sequelize,
  });

  return User;
}
