import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, min: 6, max: 1024 },
}, {timestamps: true});

export default mongoose.model('Category', categorySchema);