// User Model Definition, Database Synchronization, and Password Handling
const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

sequelize.sync({ force: false }) // Set force to true to drop and recreate tables (use with caution)
  .then(() => {
    console.log('Database and tables are synchronized.');
  })
  .catch((error) => {
    console.error('Error synchronizing the database:', error);
  }); 
  
class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4]
        }
    }
}, {
    hooks: {
        async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
        },
        async beforeUpdate(updatedUserData) {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
        }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
})


module.exports = User;