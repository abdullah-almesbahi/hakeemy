import Sequelize from 'sequelize';

// Option 1: Passing parameters separately
const sequelize = new Sequelize('api@prod', 'xxx', 'xxx', {
  host: 'xxxx',
  dialect: 'mysql'
});

export const DBProductFeature = sequelize.define(
  'ProductFeature',
  {
    // attributes
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
      //   allowNull: false
    },
    name_ar: {
      type: Sequelize.STRING
      // allowNull defaults to true
    },
    value: {
      type: Sequelize.STRING
      // allowNull defaults to true
    },
    value_ar: {
      type: Sequelize.STRING
      // allowNull defaults to true
    },
    sort: {
      type: Sequelize.INTEGER
      // allowNull defaults to true
    }
  },
  {
    // options
    freezeTableName: true
  }
);

export default sequelize;
