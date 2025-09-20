const express = require ('express');
const router = express.Router();
const {addJob, getJobs} = require('../controllers/jobsController');

router.post('/add', addJob);
router.get("/getjobs", getJobs);

module.exports = router;