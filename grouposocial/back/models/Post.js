// eslint-disable-next-line no-unused-vars
import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Post = sequelize.define('Post', 
{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  publishedDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  readers: {
    type: DataTypes.JSON,
    defaultValue: []
  }
},
{
    timestamps: false
});

export default Post;