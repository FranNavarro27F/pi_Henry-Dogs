const axios= require("axios");
const { Dogs, Temperament } = require("../../db");


//----- GET temperaments ------------------------------------------
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
//------------------------------------------------------------------x



module.exports={
    getTemperaments
}