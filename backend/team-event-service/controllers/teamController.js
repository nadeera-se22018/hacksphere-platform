const Team = require('../models/Team');
const Event = require('../models/Event');

const createTeam = async (req, res) => {
    try {
        const { name, eventId, leaderId } = req.body;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ success: false, message: 'Hackathon event not found' });
        }

        const teamExists = await Team.findOne({ name });
        if (teamExists) {
            return res.status(400).json({ success: false, message: 'Team name already exists' });
        }

        const team = await Team.create({
            name,
            eventId,
            leaderId,
            members: [
                { userId: leaderId, status: 'accepted' }
            ]
        });

        res.status(201).json({
            success: true,
            data: team,
            message: 'Team created successfully!'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createTeam
};