const mongoose = require('mongoose');

const pwResetRequestSchema = mongoose.Schema({

  resetCodeHash: {
    type: String,
    required: true
  },
  resetCodeSalt: {
    type: String,
    required: true
  },
  expirationDate: { 
    type: Date,
    required: true
  }
    
});

module.exports = mongoose.model('PwResetRequest', pwResetRequestSchema);