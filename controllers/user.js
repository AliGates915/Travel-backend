import mongoose from 'mongoose';
import User from '../models/User.js'; 
  // Update
  export const updateUser = async (req, res, next) => {
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updateUser);
    } catch (error) {
      next(error);
    }
  };
  // Delete
  export const deleteUser = async (req, res, next) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
      }
  
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json('Successful delete');
    } catch (error) {
      console.error('Error deleting user:', error);
      next(error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };

    // GET
    export const getUser = async (req, res, next) => {
      try {
        const userId = req.params.id;
    
        // Check if the ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(400).json({ message: "Invalid user ID" });
        }
    
        // Find user by ID
        const getUser = await User.findById(userId);
    
        if (!getUser) {
          return res.status(404).json({ message: "User not found" });
        }
    
        res.status(200).json(getUser);
      } catch (error) {
        next(error);  // Pass the error to the error handler middleware
      }
    };
    
  // GET ALL
  export const getAllUser = async (req, res, next) => {
      try {
          const getAll = await User.find()
          res.status(200).json(getAll);
      }  catch (error) {
        next(error);
      }
    };
    
    
    