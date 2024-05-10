import mongoose from "mongoose";

const userChatSchema = new mongoose.Schema(
	{
		user:
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				required: true,
			},
		Chats: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Chat",
				default: [],
			},
		],
		
	},
	{ timestamps: true }
);

const UserChat = mongoose.model("UserChat", userChatSchema);

export default UserChat;
