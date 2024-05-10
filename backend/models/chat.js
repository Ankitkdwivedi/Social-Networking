const mongoose =require( 'mongoose');

const chatSchema=new mongoose.Schema({
	receiverId:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	senderId:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	chat:{
		type:String,
		required:true,
	}
},{timeseries:true});

const Chat=new mongoose.model("chat	",chatSchema);
module.exports=Chat; 