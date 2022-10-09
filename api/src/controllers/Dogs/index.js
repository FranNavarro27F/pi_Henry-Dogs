const axios= require("axios");
const { Dog, Temperament } = require("../../db");
const { prepDogCard, prepDogDetail } = require("../AuxFun/index.js");


//----- GET /dogs by name -----------------------
const getNameBreeds= async (name)=>{     
    let dogis= await getDogs();
    let a=dogis.filter(cur=> cur.name.toLowerCase().includes(name.toLowerCase()));
    if(a.length===0){
       throw new Error("did not find a breed of dog with the indicated name");
    }
    return a;
};
//----------------------------------------------x


//----- GET /dogs  all --------------------------
const getDogs= async ()=>{
    let DB=( await Dog.findAll({
        include: {
            model: Temperament,
            attribute:["name"],
            through: {
                attributes:[],
            }
        }
    }) ).map(cur=> cur.dataValues);
    DB.forEach(cur=> cur.temperaments=cur.temperaments.map(cur=> cur.dataValues.name));
    let card_db_dogs=DB.map(cur=>{
        return{
            img:cur.img,
            id:cur.id,
            name:cur.name,
            weight_min:cur.weight_min,
            weight_max:cur.weight_max,
            temperament:cur.temperaments
        }
    });
    let dogs= (await axios.get(`https://api.thedogapi.com/v1/breeds`)).data;
    let cards_dogs= prepDogCard(dogs);
    let concatFiltNullWeight1= cards_dogs.filter(cur=> cur.weight_min >= 1 && cur.weight_max >= 1);
    if(card_db_dogs.length!==0){
        let concated= card_db_dogs.concat(cards_dogs);
        let concatFiltNullWeight= concated.filter(cur=> cur.weight_min >= 1 && cur.weight_max >= 1);
        return concatFiltNullWeight;
    }else{
        return concatFiltNullWeight1;
    }
};
//----------------------------------------------x


//----- GET dogs by id --------------------------
const getIdBreeds= async (id)=>{
    if(id.includes("-")){
        let dogDb=(await Dog.findByPk(id,{
            include:{
                model: Temperament,
                attributes:["name"],
                through:{
                    attributes:[],
                }
            }
        })).dataValues;
        let dogDbM={
            id: dogDb.id,
            img: dogDb.img,
            name: dogDb.name,
            height_min: dogDb.height_min,
            height_max: dogDb.height_max,
            weight_min: dogDb.weight_min,
            weight_max: dogDb.weight_max,
            life_span: dogDb.life_span,
            temperament: dogDb.temperaments.map(cur=> cur.name)
        }
        return dogDbM;
    }else{
        let dogs= (await axios.get(`https://api.thedogapi.com/v1/breeds`)).data;
        let idBreedsDetail= prepDogDetail(dogs);
        let filt= idBreedsDetail.filter(cur=> cur.id== id);
        if(filt.length===0){
            throw new Error("did not find a breed of dog with the indicated ID");
        }else{
            return filt[0];
        }
    } 
};
//----------------------------------------------x


//----- POST dogs -------------------------------
const PostDogs= async (body)=>{

    let {img, name, height_min, height_max, weight_min, weight_max, life_span, temperament}=body;
    if(!img){
        let arr=[
            "https://www.snau.es/blog/wp-content/uploads/2019/03/cachorro-1.jpg",
            "https://www.hillspet.com.mx/content/dam/cp-sites/hills/hills-pet/es_mx/skyword/golden-retriever-puppy-running-in-field-SW.jpg",
            "https://i.pinimg.com/originals/ba/90/f4/ba90f4b6abf933572754ca5a36980dfc.jpg",
            "https://i.pinimg.com/originals/02/e5/ce/02e5ce7b677c1efb0d54283693445631.jpg",
            "https://www.soy502.com/sites/default/files/styles/full_node/public/2022/Feb/05/meme_perrito_cuando_no_quieres_dar_explicaciones_soy502_guatemala.jpg",
            "https://www.publimetro.cl/resizer/mJVQolfgbtGIvoXnli4Ttxx95e8=/1440x1080/filters:format(jpg):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/metroworldnews/MODCI5L57RFGVF7ZPHSJP42KRY.jpg",
            "https://imgmedia.wapa.pe/1200x660/wapa/migration/imagen/2019/03/20/noticia-1553104004-perro-doge-meme-viral.png",
    ];
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

    return theDog;
};


module.exports={
    getDogs,
    PostDogs,
    getIdBreeds,
    getNameBreeds
    
}