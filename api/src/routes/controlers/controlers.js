const axios= require("axios");
const {Dog, Temperament}= require("../../db.js");
const {prepDogCard, prepDogDetail}= require("../auxFun/auxFun.js");

// const {API_KEY}= require("../../db.js")
// const {API_KEY}= process.env;
// console.log(API_KEY)

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
            weight:cur.weight,
            temperament:cur.temperaments
        }
    });

    let dogs= (await axios.get(`https://api.thedogapi.com/v1/breeds`)).data;
    let cards_dogs= prepDogCard(dogs);
    if(card_db_dogs.length!==0){
        let concat= card_db_dogs.concat(cards_dogs);
        console.log(concat)
        return concat;
    }else{
        return cards_dogs;
    }
}

const getNameBreeds= async (name)=>{     
     let dogis= await getDogs();
     let a=dogis.filter(cur=> cur.name.toLowerCase().includes(name.toLowerCase()));
     if(a.length===0){
        throw new Error("did not find a breed of dog with the indicated name");
     }
     return a;
}

const getIdBreeds= async (id)=>{
    let dogs= (await axios.get(`https://api.thedogapi.com/v1/breeds`)).data;
    let idBreedsDetail= prepDogDetail(dogs);
    let filt= idBreedsDetail.filter(cur=> cur.id== id);
    if(filt.length===0){
        throw new Error("did not find a breed of dog with the indicated ID");
    }else{
        return filt;
    }
}

const getTemperaments= async ()=>{
    let temperament_db=( await Temperament.findAll()).map(cur=> cur.dataValues);
    if(temperament_db.length===0){
        let dogs= await getDogs()
        let temperamentS=Array.from(new Set((dogs.map(cur=> cur.temperament)).flat())).filter(cur=> cur!== undefined)
        temperamentS.forEach(async cur=> await Temperament.create({name:cur}))
        console.log("TEMPERAMENTS TRAIDOS DE **API**")
    }
    console.log("TEMPERAMENTS TRAIDOS DE **DB**")
    return temperament_db;
}
getTemperaments()



module.exports={
    getDogs,
    getIdBreeds,
    getNameBreeds,
    getTemperaments,
}