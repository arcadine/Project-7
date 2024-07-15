// eslint-disable-next-line no-unused-vars
import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../database.js';
import moment from 'moment';

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
    timestamps: false,
    getterMethods: {
      formattedDate() {
        return moment(this.publishedDate).format('MM/DD/YYYY');
      }
    }
});

Post.sync().then(console.log("Posts were synced.")).catch((error) =>
  console.log("There was an error while syncing posts", error));

export default Post;