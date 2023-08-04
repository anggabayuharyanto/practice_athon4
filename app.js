// app.js (or index.js)

const Sequelize = require('sequelize');
const config = require('./config');
const User = require('./models/user');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: true, // Enable logging to see database queries
  }
);

// Sync the model with the database
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
    await User.sync({ force: true }); // This will create the "User" table in the database
    console.log('User model synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize; // Export the sequelize instance
