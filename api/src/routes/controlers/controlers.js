const axios= require("axios");
const {Dog, Temperament}= require("../../db.js");
const {prepDogCard, prepDogDetail}= require("../auxFun/auxFun.js");

// const {API_KEY}= require("../../db.js")
// const {API_KEY}= process.env;
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
const getNameBreeds= async (name)=>{     
     let dogis= await getDogs();
     let a=dogis.filter(cur=> cur.name.toLowerCase().includes(name.toLowerCase()));
     if(a.length===0){
        throw new Error("did not find a breed of dog with the indicated name");
     }
     return a;
};
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
const getTemperaments= async ()=>{
    let temperament_db=( await Temperament.findAll()).map(cur=> cur.dataValues);
    if(temperament_db.length===0){
        let dogs_api= (await axios.get(`https://api.thedogapi.com/v1/breeds`)).data;
        let collector_temperaments= dogs_api.map(cur=> {
            if(cur.temperament){
                return cur.temperament
            }
        })
        let splited_and_flated_collector_temperaments= (collector_temperaments.map(cur=> cur?.split(", "))).flat();
        let temperaments= Array.from( new Set( splited_and_flated_collector_temperaments));
        let notNullTemperaments= temperaments.filter(cur=> cur!== undefined )
        let temperaments_created= (await Promise.all(notNullTemperaments.map( async cur=> await Temperament.create({name: cur})))).map(cur=> cur.dataValues);
        // console.log("**temperaments_from_API_and_created: **", temperaments_created)
        console.log("**temperaments_from_API_and_created: **")
        return temperaments_created;
    }else{
        // console.log("TEMPERAMENTS TRAIDOS DE **DB**", temperament_db)
        console.log("TEMPERAMENTS TRAIDOS DE **DB**")
        return temperament_db;
    }
};
// getTemperaments()


module.exports={
    getDogs,
    getIdBreeds,
    getNameBreeds,
    getTemperaments,
}