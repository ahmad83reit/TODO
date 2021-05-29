const mongoose=require("mongoose");

const BranchSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name Required"],
        unique:true


    },
    compId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Company',
      },
    isMainBranch:{
        type:Boolean,
        default:true
    },
    description:String,
    address:String,
    headofdep:{
        type: mongoose.Schema.ObjectId,
         ref: 'Employee'
   },
},
   {
   toJSON: { virtuals: true },
   toObject: { virtuals: true }
  
});

BranchSchema.virtual('Department', {
    ref: 'Department',
    localField: '_id',
    foreignField: 'branchId',
    justOne: false
  });



  BranchSchema.virtual('Teams', {
    ref: 'Team',
    localField: '_id',
    foreignField: 'BranchId',
    justOne: false
  });


  BranchSchema.virtual('EMPS', {
    ref: 'Employee',
    localField: '_id',
    foreignField: 'branchId',
    justOne: false
  });



  BranchSchema.pre('find', function (next) {
    this.populate('headofdep');
   // this.populate('countryId');
    next();
  });

module.exports=mongoose.model('Branch', BranchSchema);