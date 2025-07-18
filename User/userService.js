 const { where } = require('sequelize');
const {User} = require('./userModel');
 const bcrypt = require('bcryptjs');


exports.createUser = async ({ username, email, password }) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('Email already registered');
  }

  const hashedPassword = await bcrypt.hash(password, 10); 

  const newUser = await User.create({ username, email, password: hashedPassword });
  return newUser;
};

exports.getAllUsers = async () => {
  return await User.findAll();
};

exports.getUserByEmail=async (email) => {
  return await User.findOne({where:{email}});
}

exports.getUserById=async (id) => {
  return await User.findByPk(id);
}
exports.updateUser = async (id, updateData) => {
  const user = await User.findByPk(id);
  if (!user) {
    return null;
  }
  await user.update(updateData);
  return user;
};

exports.deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    return null;
  }
  await user.destroy();
  return user;
};


