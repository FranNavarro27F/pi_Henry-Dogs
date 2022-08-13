
function prepDogCard(arr_dog_api){
    let dog_card=arr_dog_api.map(cur=> {
       return {
           img:cur.image.url,
           id:cur.id,
           name:cur.name,
           weight:cur.weight.metric,
           temperament:cur.temperament?.split(", ")
       } 
    })
    return dog_card;
}

function prepDogDetail(arr_dog_api_1){
    let dog_Detail= arr_dog_api_1.map(cur=>{
        return {
            img:cur.image.url,
            id:cur.id,
            name:cur.name,
            height:cur.height.metric,
            weight:cur.weight.metric,
            life_span:cur.life_span,
            temperament:cur.temperament?.split(", ")

        }
    })
    return dog_Detail;
}



module.exports={
    prepDogCard,
    prepDogDetail
}

