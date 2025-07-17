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


exports.verifyUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return { user: null, message: 'Incorrect email' };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { user: null, message: 'Incorrect password' };
  }

  return { user };
};
