const mongoose=require("mongoose");

const RewardsSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"rewards Name Required"]
    },

      
    IsDirect:Boolean,
    IsOnSalary:Boolean,
    value:Number,
    JobTitleID:{
        type: mongoose.Schema.ObjectId,
        ref: 'JobTitleType',
        required: false
      },


      compId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Company',
      },

});



module.exports=mongoose.model('Rewards', RewardsSchema);