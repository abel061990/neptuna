import { combineReducers } from 'redux';
import {ReducerProject} from './reducer_project';
import {Reducermodal} from './reducer_modal';
const rootReducer =combineReducers({
        projects: ReducerProject,
        modal: Reducermodal
});
export default rootReducer;