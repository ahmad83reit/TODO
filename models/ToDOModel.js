const { strikethrough } = require('colors');
const mongoose = require('mongoose');






const ToDOSchema = new mongoose.Schema({
    
    name: {
        type: String,
        require: true,
      },

      description: {
        type: String,
     
      },

      userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },

      TaskDate: Date,

      

      
 
});

module.exports = mongoose.model('ToDO', ToDOSchema);

