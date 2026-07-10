const express = require('express');
const router = express.Router();
const { createTeam, inviteMember, acceptInvitation, getTeamsForEvent, getTeamById, getUserTeams } = require('../controllers/teamController');

router.route('/')
    .post(createTeam);

router.route('/event/:eventId')
    .get(getTeamsForEvent);

router.route('/user/:userId')
    .get(getUserTeams);

router.route('/:id')
    .get(getTeamById);

router.route('/:id/invite')
    .post(inviteMember);

router.route('/:id/accept')
    .put(acceptInvitation);

module.exports = router;