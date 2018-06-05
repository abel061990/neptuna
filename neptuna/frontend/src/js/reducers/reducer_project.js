import { ADD_PROJECT} from "../constants/action-types";
const initialStateproject = {
  projects: []
};

export const ReducerProject=(state = initialStateproject, action) => {
                        switch (action.type) {
                        case ADD_PROJECT:
                          return { ...state, projects: [...state.projects, action.payload] };
                        default:
                          return state;

                            };}
