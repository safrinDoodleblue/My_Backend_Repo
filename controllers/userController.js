
const User = require('../models/userModel');
const { message } = require('../validations/userValidation');

exports.createUser=async (req,res) => {
    try {
        const{username,email,password}=req.body;
        const existingUser=await User.findOne({where:{email}});
        if (existingUser) {
            return res.status(409).json({error:'Email already registered'});
        }
        const user=await User.create({username,email,password});
        res.status(201).json({message:'User created',user});
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}

exports.getAllUsers=async (req,res) => {
    try {
        const users=await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.updateUser=async (req,res) => {
    const {id}=req.params;
    try {
        const user=await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.update(req.body);
        res.json({ message: 'User updated' });
    } catch (error) {
        console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
    }
}

exports.deleteUser=async (req,res) => {
     const {id}=req.params;
     try {
        const user=await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.destroy();
        res.json({ message: 'User deleted' });
     } catch (error) {
        console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
     }
}