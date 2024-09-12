const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // tokens: [{ 
  //   token: {
  //     type: String,
  //     required: true,
  //   },
  // }],
});

// Hash the password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};

// Generate authentication token
userSchema.methods.generateAuthToken = async function() {
  try {
    const token = await jwt.sign({ _id: this._id }, process.env.SECRET_KEY, { expiresIn: '8h' });
    
    // Initialize tokens array if not present
    if (!this.tokens) {
      this.tokens = [];
    }

    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } catch (err) {
    console.error('Error generating token:', err);
    throw err;
  }
};

const User = mongoose.model('User', userSchema);
module.exports = User;
