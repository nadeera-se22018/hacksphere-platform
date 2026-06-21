const Event = require('../models/Event');

const createEvent = async (req, res) => {
    try {
        const { title, description, startDate, endDate, maxTeamSize, creatorId } = req.body;

        const event = await Event.create({
            title,
            description,
            startDate,
            endDate,
            maxTeamSize,
            creatorId
        });

        res.status(201).json({
            success: true,
            data: event,
            message: 'Hackathon event created successfully!'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getEvents = async (req, res) => {
    try {
        const events = await Event.find({});
        res.status(200).json({
            success: true,
            count: events.length,
            data: events
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createEvent,
    getEvents
};