import mongoose from 'mongoose';

const priceSchema = new mongoose.Schema({
    amount: { type: String, required: true, min: 6, max: 1024 },
}, {timestamps: true});

export default mongoose.model('Price', priceSchema);