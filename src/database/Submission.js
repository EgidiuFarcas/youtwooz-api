import mongoose from 'mongoose';

/**
 * type (2d/3d/2-3d)
 * hasBox
 * name
 * description
 * categoryID
 * price
 * height
 * submitterID
 * 2dartist
 * 3dartist
 * image2d
 * image3d
 * imagebox
 * status (pending/published/suspended)
 * statusMessage
 */

const submissionSchema = new mongoose.Schema({
    submitterID: { type: mongoose.Schema.Types.ObjectID, ref: 'User'},
    type: { type: Number, required: true, min: -1, max: 2},
    hasBox: { type: Boolean, required: true, default: false},
    name: { type: String, required: true, min: 6, max: 255 },
    description: { type: String, min: 255, max: 5120},
    categoryID: { type: mongoose.Schema.Types.ObjectID, ref: 'Category'},
    priceID: { type: mongoose.Schema.Types.ObjectID, ref: 'Price'},
    height: { type: String},
    gradientFrom: { type: String},
    gradientTo: { type: String},
    artist2D: { type: String},
    artist3D: { type: String},
    image2D: { type: String},
    image3D: { type: String},
    imageBox: { type: String},
    status: { type: String, required: true, default: "draft"},
    statusMessage: { type: String, required: true, default: "New submission"}
}, {timestamps: true});

export default mongoose.model('Submission', submissionSchema);