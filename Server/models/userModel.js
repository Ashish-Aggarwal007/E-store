import mongoose from 'mongoose';

// creating a schema for user
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    
  },
  {
    timestamps: true,
  }
);
// mongoose.model is function that accepts two parameter as 
// name of model and schema  
const User = mongoose.model('User', userSchema);
export default User;
