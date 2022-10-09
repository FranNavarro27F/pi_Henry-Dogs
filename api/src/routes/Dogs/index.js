const { Router } = require("express");
const { Dog } = require("../../db.js");

//importar controladores
const { PostDogs, getNameBreeds, getDogs, getIdBreeds }= require("../../controllers/Dogs/index.js");


const router = Router();



//----- GET /dogs -------------------------------
router.get("/", async (req, res)=>{
    try {
        let {name}=req.query;
        if(name){
            res.send(await getNameBreeds(name));
        }else{
            res.json(await getDogs());
        }
    } catch (e) {
        res.status(400).json({Error: e.message});
    }
});
//-----------------------------------------------x

//----- GET /dogs/id -----------------------------
router.get("/:id", async (req, res)=> {
    try {
        let {id}=req.params;
        res.json(await getIdBreeds(id));
    } catch (e) {
        res.status(400).json({Error: e.message});
    }
});
//-----------------------------------------------x

//----- POST /dogs -------------------------------
router.post("/", async (req, res)=>{
    try {
        res.json(await PostDogs(req.body))
    } catch (e) {
        res.status(400).json({Error: e.message});
    }
});
//------------------------------------------------x





module.exports = router;