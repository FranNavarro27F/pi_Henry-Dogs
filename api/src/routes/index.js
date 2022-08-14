const { Router } = require('express');
const {Dog, Temperament}= require("../db");
const { getDogs, getTemperaments, getNameBreeds, getIdBreeds} = require('./controlers/controlers');

const router = Router();


router.get("/dogs", async (req, res)=>{
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

router.get("/temperaments",async (req, res)=>{
    try {
        res.json(await getTemperaments());
    } catch (e) {
        res.status(400).json({Error: e.message});
    }
});

router.get("/dogs/:id", async (req, res)=> {
    try {
        let {id}=req.params;
        res.json(await getIdBreeds(id));
    } catch (e) {
        res.status(400).json({Error: e.message});
    }
});

router.post("/dogs", async (req, res)=>{
    try {
        let {img, name, height_min, height_max, weight_min, weight_max, life_span, temperament}=req.body;
        let newDog= await Dog.create({
            img: img,
            name: name,
            height_min: height_min,
            height_max: height_max,
            weight_min: weight_min,
            weight_max: weight_max,
            life_span: life_span
        });
        await newDog.addTemperaments(temperament);

        let theDog= (await Dog.findByPk(newDog.id,{
            include: {
                model: Temperament,
                attributes: ["name"],
                through:{
                    attributes:[],
                }
            }
        })).dataValues;
        theDog.temperaments=theDog.temperaments.map(cur=> cur.dataValues.name);
        res.json(theDog)
    } catch (e) {
        res.status(400).json({Error: e.message});
    }
})




module.exports = router;
