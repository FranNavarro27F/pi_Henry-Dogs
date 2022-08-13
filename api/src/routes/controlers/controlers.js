const axios= require("axios");
const {Dog, Temperament}= require("../../db.js");
const {prepDogCard}= require("../auxFun/auxFun.js");

// const {API_KEY}= require("../../db.js")
// const {API_KEY}= process.env;
// console.log(API_KEY)

const getDogs= async ()=>{
    let dogs= (await axios.get(`https://api.thedogapi.com/v1/breeds`)).data;
    let cards_dogs= prepDogCard(dogs);
    return cards_dogs;
}

const getTemperaments= async ()=>{
    let temperament_db=( await Temperament.findAll()).map(cur=> cur.dataValues);
    if(temperament_db.length===0){
        let dogs= await getDogs()
        let temperamentS=Array.from(new Set((dogs.map(cur=> cur.temperament)).flat())).filter(cur=> cur!== undefined)
        let algo=temperamentS.forEach(async cur=> await Temperament.create({name:cur}))
        console.log("TEMPERAMENTS TRAIDOS DE **API**")
    }
    console.log("TEMPERAMENTS TRAIDOS DE **DB**")
    return temperament_db;
}
getTemperaments()



module.exports={
    getDogs,
    getTemperaments
}