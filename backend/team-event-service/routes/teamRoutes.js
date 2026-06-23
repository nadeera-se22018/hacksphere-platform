const express = require('express');
const router = express.Router();
const { createTeam, inviteMember, acceptInvitation } = require('../controllers/teamController');

router.route('/')
    .post(createTeam);

router.route('/:id/invite')
    .post(inviteMember);

router.route('/:id/accept')
    .put(acceptInvitation);

module.exports = router;