const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    startDate: { 
        type: Date, 
        required: true 
    },
    endDate: { 
        type: Date, 
        required: true 
    },
    maxTeamSize: { 
        type: Number, 
        default: 4 
    },
    status: { 
        type: String, 
        enum: ['upcoming', 'ongoing', 'completed'], 
        default: 'upcoming' 
    },
    creatorId: { 
        type: String, 
        required: true 
    }
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Event', eventSchema);