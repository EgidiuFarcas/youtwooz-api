import mongoose from 'mongoose';
import randToken from 'rand-token';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, min: 6, max: 255 },
    email: { type: String, required: true, min: 6, max: 255, unique: true },
    password: { type: String, require: true, min: 6, max: 1024 },
    verified: { type: Boolean, default: false },
    verifyToken: { type: String, default: () => randToken.generate(64)},
    role: { type: mongoose.Schema.Types.ObjectID, ref: 'Role' },
    points: { type: Number, default: 0},
    pfp: { type: String, default: null}
}, {timestamps: true});

export default mongoose.model('User', userSchema);