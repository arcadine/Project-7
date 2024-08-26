// eslint-disable-next-line no-unused-vars
import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../database.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  }},
  {
    timestamps: false
});

User.sync().then(console.log("Users were synced.")).catch((error) =>
  console.log("There was an error while syncing users", error));
export default User;