import axios from "axios";

export function getDogs(){
    return async function (dispatch){
        let dogs= (await axios.get("http://localhost:3001/dogs")).data;
        return dispatch({
            type:"GET_DOGS",
            payload: dogs
        })
    }
}

export function setCurPage(num){
    return function (dispatch){
        return dispatch({
            type:"SET_PAGE",
            payload: num
        })
    }
};

export function getTemperaments(){
    return async function (dispatch){
        let temperaments= (await axios.get("http://localhost:3001/temperaments")).data;
        return dispatch({
            type:"GET_TEMPERAMENTS",
            payload: temperaments
        })
    }
};

export function createDog(input){
    return async function (dispatch){
        let newDog= (await axios.post("http://localhost:3001/dogs", input)).data;
        return dispatch({
            type:"CREATE_DOG",
            payload: newDog
        })
    }
};

export function findName(name){
    return async function (dispatch){
        try {
            let faundByName= (await axios.get(`http://localhost:3001/dogs?name=${name}`)).data;
            return dispatch({
                type:"SEARCH_NAME",
                payload: faundByName
            })
        } catch (e) {
            console.log(e.request.response)
        }
    }
};

export function orderByName(order){
    return function (dispatch){
        return dispatch({
            type:"ORDER_NAME",
            payload: order
        })
    }
};

export function orderByWeight(order){
    return function dispatch(dispatch){
        return dispatch({
            type:"ORDER_WEIGHT",
            payload: order
        })
    }
}