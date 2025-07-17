 const {User} = require('./userModel');

exports.createUser = async ({ username, email, password }) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('Email already registered');
  }
  const newUser = await User.create({ username, email, password });
  return newUser;
};

exports.getAllUsers = async () => {
  return await User.findAll();
};

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
