const { Router } = require('express');
const { getDogs, getTemperaments} = require('./controlers/controlers');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get("/dogs", async (req, res)=>{

    try {
        res.json(await getDogs());
    } catch (e) {
        res.status(400).json({error: e.message});
    }
});

router.get("/temperaments",async (req, res)=>{
    try {
        res.json(await getTemperaments());
    } catch (e) {
        res.status(400).json({error: e.message});
    }
});




module.exports = router;
