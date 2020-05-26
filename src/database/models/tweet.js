import { DataTypes, Model } from 'sequelize';

export default function (sequelize) {
  class Tweet extends Model {
    static associate(models) {
      Tweet.belongsTo(models.user, { foreignKey: 'userId' });
    }
  }

  Tweet.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tweet: {
      type: DataTypes.STRING(140),
      allowNull: false,
    },
  }, {
    modelName: 'tweet',
    sequelize,
  });

  return Tweet;
}
