const { Router } = require('express');

const dogsRouter= require("../routes/Dogs/index.js");
const temperamentsRouter= require("../routes/Temperaments/index.js");
const deleteRouter= require("../routes/Delete/index.js")


const router = Router();


router.use("/dogs", dogsRouter);
router.use("/delete", deleteRouter)
router.use("/temperaments", temperamentsRouter);


module.exports = router;
