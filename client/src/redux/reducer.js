
const initialState={
    dogs:[],
    allDogs:[],
    curPage: 1,
    temperaments:[]
};

export default function rootReducer(state= initialState, action) {

    switch(action.type){

        case "GET_DOGS":
            return{
                ...state,
                dogs:action.payload,
                allDogs:action.payload
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


        default:
            return state;
    }
}