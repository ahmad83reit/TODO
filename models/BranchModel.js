const mongoose=require("mongoose");

const BranchSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name Required"],
        unique:true


    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    isMainBranch:{
        type:Boolean,
        default:true
    },
    description:String,
    address:String,
    headofbranch:{
        type: mongoose.Schema.ObjectId,
         ref: 'User'
   },
},
   {
   toJSON: { virtuals: true },
   toObject: { virtuals: true }
  
});







module.exports=mongoose.model('Branch', BranchSchema);