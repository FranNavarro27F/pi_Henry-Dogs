import axios from "axios";

export function getDogs(){
    return async function (dispatch){
        let dogs= (await axios.get(`/dogs`)).data;
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
        let temperaments= (await axios.get(`/temperaments`)).data;
        return dispatch({
            type:"GET_TEMPERAMENTS",
            payload: temperaments
        })
    }
};

export function createDog(input){
    return async function (dispatch){
        let newDog= (await axios.post(`/dogs`, input)).data;
        return dispatch({
            type:"CREATE_DOG",
            payload: newDog
        })
    }
};

export function findName(name){
    return async function (dispatch){
        try {
            let faundByName= (await axios.get(`/dogs?name=${name}`)).data;
            return dispatch({
                type:"SEARCH_NAME",
                payload: faundByName
            })
        } catch (e) {
            alert(e.request.response)
        }
    }
};

export function getDetail(id){
    return async function (dispatch){
        try {
            let findID= (await axios.get(`/dogs/${id}`)).data;
            return dispatch({
                type:"GET_ID",
                payload: findID
            })
        } catch (e) {
            console.log(e.request.response)
        }
    }
}

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
};

export function filtTemp(temp){
    return function (dispatch){
        return dispatch({
            type:"FILT_TEMPERAMENT",
            payload: temp
        })
    }
};

export function filtCreated(CoN){
    return function (dispatch){
        return dispatch({
            type:"FILT_CREATED",
            payload: CoN
        })
    }
};

export function cleanDetail(){
    return function (dispatch){
        return dispatch({
            type:"CLEAN_DETAIL",
            payload:{}
        })
    }
}