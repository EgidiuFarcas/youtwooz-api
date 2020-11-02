import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
    userID: { type: String, required: true, min: 6, max: 255 },
    itemID: { type: String, required: true, min: 6, max: 255 },
}, {timestamps: true});

export default mongoose.model('Like', likeSchema);