const express = require('express');
const router = express.Router();
const { createTeam, inviteMember } = require('../controllers/teamController');

router.route('/')
    .post(createTeam);

router.route('/:id/invite')
    .post(inviteMember);

module.exports = router;