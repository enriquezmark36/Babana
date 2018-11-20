import update from "react-addons-update";
import constants from "./actionConstants";
import {Dimenstions} from "react-native";

const {GET_CURRENT_LOCATION, GET_INPUT} = constants;

//Actions


//GET USER INPUT
export function getInputData(payload){
    return{
        type: GET_INPUT,
        paylod
    }
}

//Action Handlers
function handleGetInputData(state, action){
    const {key, value} = action.payload;
    return update(state,{
        inputData:{
            [key]:{
                $set:value
            }
        }
    });
}

const ACTION_HANDLERS={
    GET_INPUT:handleGetInputData
}

const initialState ={
    inputData:{}
}
