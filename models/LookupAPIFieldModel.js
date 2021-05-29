const mongoose = require('mongoose');

const LookupAPIFieldSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name Required'],
      unique: true,
    },
    limit: {
      type: Number,
      default: 10,
    },
    placeholder: String,

    EndPointName: String,
    fieldToSearch: String,
    selectFields: String,
    labelField: String,
    valuefield: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model('LookupAPIField',LookupAPIFieldSchema);
