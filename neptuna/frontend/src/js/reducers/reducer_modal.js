const initialStatemodal= {
  modal:false
};

export const Reducermodal=(state = initialStatemodal, action) => {
                        switch (action.type) {
                        case "click":
                          return !state;
                        default:
                          return state;

                            };}

