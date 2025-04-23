const express= require('express');
const Handlequery= require ("../controllers/queries")

const router= express.Router();

router.post('/',Handlequery);

module.exports = router;