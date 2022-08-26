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
        if(!img){
            let arr=[
                "https://www.snau.es/blog/wp-content/uploads/2019/03/cachorro-1.jpg",
                "https://www.hillspet.com.mx/content/dam/cp-sites/hills/hills-pet/es_mx/skyword/golden-retriever-puppy-running-in-field-SW.jpg",
                "https://i.pinimg.com/originals/ba/90/f4/ba90f4b6abf933572754ca5a36980dfc.jpg",
                "https://i.pinimg.com/originals/02/e5/ce/02e5ce7b677c1efb0d54283693445631.jpg",
                "https://www.soy502.com/sites/default/files/styles/full_node/public/2022/Feb/05/meme_perrito_cuando_no_quieres_dar_explicaciones_soy502_guatemala.jpg",
                "https://www.publimetro.cl/resizer/mJVQolfgbtGIvoXnli4Ttxx95e8=/1440x1080/filters:format(jpg):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/metroworldnews/MODCI5L57RFGVF7ZPHSJP42KRY.jpg",
                "https://imgmedia.wapa.pe/1200x660/wapa/migration/imagen/2019/03/20/noticia-1553104004-perro-doge-meme-viral.png",
        ]
        img=arr[Math.round(Math.random()*6)]
        }
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

router.delete("/delete", async (req, res)=>{
    
    try {
        let {id}=req.query;

        let toDelete= await Dog.findByPk(id)
        let result= await toDelete.destroy();
        res.send(true)
    } catch (e) {
        res.status(400).json({Error: e.message})
    }
})


module.exports = router;
