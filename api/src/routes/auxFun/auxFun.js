
function prepDogCard(arr_dog_api){
    let dog_card=arr_dog_api.map((cur)=> {
       return{
           img:cur.image.url,
           id:cur.id,
           name:cur.name,
           weight:cur.weight.metric,
           temperament:cur.temperament?.split(", ")
       } 
    })
    return dog_card;
}



module.exports={
    prepDogCard
}

