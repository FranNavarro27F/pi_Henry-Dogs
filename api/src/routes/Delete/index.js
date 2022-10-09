const { Router } = require("express");
const { Dog, Temperament } = require("../../db.js");
const { DeleteDog } = require("../../controllers/Delete/index.js");

const router = Router();


//----- DELETE /delete --------------------------
router.delete("/", async (req, res)=>{
    
    try {
        let {id}=req.query;
        res.send(await DeleteDog(id))
    } catch (e) {
        res.status(400).json({Error: e.message})
    }
});
//-----------------------------------------------x



module.exports = router;