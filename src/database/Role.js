import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
    name: { type: String, required: true, min: 6, max: 1024 },
    color: { type: String, required: true, min: 7, max: 9 },
}, {timestamps: true});

export default mongoose.model('Role', roleSchema);