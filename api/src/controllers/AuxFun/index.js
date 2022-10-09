
//--- acomoda informacion de la API  a --> fromato card para /home ------
function prepDogCard(arr_dog_api){
    let dog_card=arr_dog_api.map(cur=> {
        let a=(cur.weight.metric.split("-")).map(cur=> Number(cur));
       return {
           img:cur.image.url,
           id:cur.id,
           name:cur.name,
           weight_min: a[0],
           weight_max: a[1],
           temperament:cur.temperament?.split(", ")
       } 
    })
    return dog_card;
};
//-----------------------------------------------------------------------x

//----- acomoda infromacion de la API a --> formato detail para /detail---
function prepDogDetail(arr_dog_api_1){
    let dog_Detail= arr_dog_api_1.map(cur=>{
        let a=(cur.weight.metric.split("-")).map(cur=> Number(cur));
        let b= (cur.height.metric.split("-")).map(cur=> Number(cur));
        return {
            img:cur.image.url,
            id:cur.id,
            name:cur.name,
            weight_min: a[0],
            weight_max: a[1],
            height_min: b[0],
            height_max: b[1],
            life_span:cur.life_span,
            temperament:cur.temperament?.split(", ")

        }
    })
    return dog_Detail;
};
//-------------------------------------------------------------------------x


module.exports={
    prepDogCard,
    prepDogDetail
}

