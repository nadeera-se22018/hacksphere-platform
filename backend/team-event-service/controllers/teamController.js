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


const inviteMember = async (req, res) => {
    try {
        const { userId } = req.body; 
        const teamId = req.params.id; 

        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ success: false, message: 'Team not found' });
        }

        const event = await Event.findById(team.eventId);
        if (team.members.length >= event.maxTeamSize) {
            return res.status(400).json({ success: false, message: 'Team has reached its maximum size limit' });
        }

        const isAlreadyMember = team.members.some(member => member.userId === userId);
        if (isAlreadyMember) {
            return res.status(400).json({ success: false, message: 'User is already a member or invitation is pending' });
        }

        team.members.push({ userId, status: 'pending' });
        await team.save();

        res.status(200).json({
            success: true,
            data: team,
            message: 'Invitation sent successfully!'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const acceptInvitation = async (req, res) => {
    try {
        const { userId } = req.body; 
        const teamId = req.params.id;

        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ success: false, message: 'Team not found' });
        }

        const memberIndex = team.members.findIndex(member => member.userId === userId);

        if (memberIndex === -1) {
            return res.status(400).json({ success: false, message: 'User is not invited to this team' });
        }

        if (team.members[memberIndex].status === 'accepted') {
            return res.status(400).json({ success: false, message: 'User has already accepted the invitation' });
        }

        team.members[memberIndex].status = 'accepted';
        await team.save();

        res.status(200).json({
            success: true,
            data: team,
            message: 'Invitation accepted successfully!'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getTeamsForEvent = async (req, res) => {
    try {
        const eventId = req.params.eventId;

        const teams = await Team.find({ eventId });

        res.status(200).json({
            success: true,
            count: teams.length,
            data: teams
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getTeamById = async (req, res) => {
    try {
        const teamId = req.params.id;

        const team = await Team.findById(teamId);

        if (!team) {
            return res.status(404).json({ success: false, message: 'Team not found' });
        }

        res.status(200).json({
            success: true,
            data: team
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getUserTeams = async (req, res) => {
    try {
        const userId = req.params.userId;

        const teams = await Team.find({
            $or: [
                { leaderId: userId },
                { 'members.userId': userId }
            ]
        });

        res.status(200).json({
            success: true,
            count: teams.length,
            data: teams
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createTeam,
    inviteMember,
    acceptInvitation,
    getTeamsForEvent,
    getTeamById,
    getUserTeams
};