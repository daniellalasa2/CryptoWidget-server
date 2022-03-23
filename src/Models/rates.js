const mongoose = require("mongoose");

const ratesSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
  name: String,
  date:{
    type:Date,
    default:Date.now
  },
  rates:Object
});

module.exports = mongoose.model("Rates", ratesSchema);