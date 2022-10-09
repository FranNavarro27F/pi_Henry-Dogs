const { Router } = require("express");
const { Dog, Temperament } = require("../../db.js");
const { getTemperaments } = require("../../controllers/Temperaments/index.js");


const router = Router();


//----- GET /temperaments ------------------------
router.get("/",async (req, res)=>{
    try {
        res.json(await getTemperaments());
    } catch (e) {
        res.status(400).json({Error: e.message});
    }
});
//-----------------------------------------------x



module.exports = router;