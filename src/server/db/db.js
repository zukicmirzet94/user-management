const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const UserModel = require('../models/user.model');
const PermissionModel = require('../models/permission.model');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  port: config.port
});

const User = UserModel(sequelize, Sequelize);
const Permission = PermissionModel(sequelize, Sequelize);

const UserPermission = sequelize.define(
  'user-permission',
  {},
  {
    timestamps: false,
  }
);

// Many-Many relationship for User and Permission
User.belongsToMany(Permission, {
  foreignKey: 'id',
  through: UserPermission,
});
Permission.belongsToMany(User, {
  foreignKey: 'code',
  through: UserPermission,
});

sequelize.sync({ force: false })
  .then(() => {
    console.log(`Database & tables created here!`)
  })

module.exports = {
  sequelize,
  User,
  Permission,
  UserPermission
}
