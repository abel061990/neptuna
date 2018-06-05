import { ADD_PROJECT } from "../constants/action-types";
export const addproject = project => ({ type: ADD_PROJECT, payload: project });
export const modalclick=modal=>({type:"click",payload:modal})