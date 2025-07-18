const userService = require('./userService');
const jwt=require('jsonwebtoken');
const passport = require('passport');
const bcrypt=require('bcrypt');
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await userService.createUser({ username, email, password });
    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    // const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // res.status(200).json({
    //   message: 'Fetched all users',
    //   token, 
    //   users
    // });
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.loginUser=async (req,res) => {
   const {email,password}=req.body;
  try {
   const user=await userService.getUserByEmail(email);
   if (!user) {
      return res.status(401).json({message:'Invalid Email'});
   }
   const isMatch=await bcrypt.compare(password,user.password);
   if (!isMatch) {
    return res.status(401).json({message:'Invalid Password'});
   }
   const token=jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn: '1h'});
   res.json({
    message: 'Login Successful',
    token,
    user:{id:user.id,username:user.username,email:user.email},
   });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({message:'Internal server error'});
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await userService.updateUser(id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User updated' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await userService.deleteUser(id);
    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

