import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectID, ref: 'User', required: true, min: 6, max: 255 },
    itemID: { type: String, required: true, min: 6, max: 255 },
    text: { type: String, required: true, min: 6, max: 500 },
}, {timestamps: true});

export default mongoose.model('Comment', commentSchema);