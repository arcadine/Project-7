import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

//console.log(process.env.DB_NAME);
//console.log(process.env.DB_PASSWORD);

// Create a Sequelize instance with the provided configuration
const sequelize = new Sequelize(
  // eslint-disable-next-line no-undef
  process.env.DB_NAME,
  // eslint-disable-next-line no-undef
  process.env.DB_USER,
  // eslint-disable-next-line no-undef
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
  }
);

// Test the connection to the database
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

export default sequelize;