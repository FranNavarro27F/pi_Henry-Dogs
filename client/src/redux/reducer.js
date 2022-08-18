
const initialState={
    dogs:[],
    allDogs:[],
    curPage: 1,
    temperaments:[],
    detail:{},
    loader:true,
    error:null,
};

export default function rootReducer(state= initialState, action) {

    switch(action.type){

        case "GET_DOGS":
            return{
                ...state,
                dogs:action.payload,
                allDogs:action.payload,
                loader:false,
            }
        case "SET_PAGE":
            return{
                ...state,
                curPage: action.payload
            }
        case "GET_TEMPERAMENTS":
            return{
                ...state,
                temperaments: action.payload
            }
        case "CREATE_DOG":
            return{
                ...state,
                dogs: [...state.dogs, action.payload]
            }
        case "SEARCH_NAME":
            return{
                ...state,
                dogs:action.payload
            }
        case "ORDER_NAME":
            let auxDogs1=[...state.allDogs];

            if(action.payload=== "a-z"){
                return{
                    ...state,
                    dogs: auxDogs1.sort((a,b)=>{
                        if(a.name.toLowerCase() < b.name.toLowerCase()){
                            return -1;
                        }
                        if(a.name.toLowerCase() > b.name.toLowerCase()){
                            return 1;
                        }
                        return 0;
                    })
                }
            }
            if(action.payload=== "z-a"){
                return{
                    ...state,
                    dogs: auxDogs1.sort((a,b)=>{
                        if(a.name.toLowerCase() < b.name.toLowerCase()){
                            return 1;
                        }
                        if(a.name.toLowerCase() > b.name.toLowerCase()){
                            return -1;
                        }
                        return 0;
                    })
                }
            }
            return {
                ...state,
                dogs: state.allDogs
            }
        case "ORDER_WEIGHT":
            let auxDogs2=[...state.allDogs];
            let average=(weight_min, weight_max)=>{
                return (weight_min + weight_max)/2
            }
        
            if(action.payload=== "min_weight"){
                return{
                    ...state,
                    dogs: auxDogs2.sort((a,b)=>{
                        if(average(a.weight_min, a.weight_max) < average(b.weight_min, b.weight_max)){
                            return -1;
                        }
                        if(average(a.weight_min, a.weight_max) > average(b.weight_min, b.weight_max)){
                            return 1;
                        }
                        return 0;
                    })
                }
            }
            if(action.payload=== "max_weight"){
                return{
                    ...state,
                    dogs: auxDogs2.sort((a,b)=>{
                        if(average(a.weight_min, a.weight_max) < average(b.weight_min, b.weight_max)){
                            return 1;
                        }
                        if(average(a.weight_min, a.weight_max) > average(b.weight_min, b.weight_max)){
                            return -1;
                        }
                        return 0;
                    })
                }
            }
            return{
                ...state,
                dogs: state.allDogs
            }    
        case "FILT_TEMPERAMENT":
            let auxDogs3=[...state.allDogs];
            return{
                ...state,
                dogs: action.payload==="default"?state.allDogs:auxDogs3.filter(cur=> cur.temperament?.includes(action.payload))
            }
        case "FILT_CREATED":
            let auxDogs4=[...state.allDogs];
            return{
                ...state,
                dogs: action.payload==="default"?state.allDogs:action.payload==="db"?auxDogs4.filter(cur=> isNaN(cur.id)):auxDogs4.filter(cur=> !isNaN(cur.id)) 
            }
        case "GET_ID":
            return{
                ...state,
                detail: action.payload
            }
        case "CLEAN_DETAIL":
            return{
                ...state,
                detail: action.payload
            }


        default:
            return state;
    }
}