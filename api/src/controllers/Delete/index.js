const { Dog } = require("../../db");


const DeleteDog= async (id)=>{
    
    let toDelete= await Dog.findByPk(id)
    let result= await toDelete.destroy();
    return true;
}


module.exports={
    DeleteDog
}