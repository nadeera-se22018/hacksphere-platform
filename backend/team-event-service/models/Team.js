const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        unique: true 
    },
    eventId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Event', 
        required: true 
    },
    leaderId: { 
        type: String, 
        required: true 
    },
    members: [{
        userId: { type: String, required: true },
        status: { 
            type: String, 
            enum: ['pending', 'accepted'], 
            default: 'pending' 
        }
    }],
    projectSubmission: {
        githubLink: { type: String, default: '' },
        liveUrl: { type: String, default: '' }
    }
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Team', teamSchema);