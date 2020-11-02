import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
    token: { type: String, required: true, min: 6, max: 1024 },
}, {timestamps: true});

export default mongoose.model('RefreshToken', tokenSchema);