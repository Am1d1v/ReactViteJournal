
// formState initial state
export const INITIAL_STATE = {
    isValid:{
        post: true,
        title: true
    },
    values:{
        post: undefined,
        title: undefined
    },
    isFormReadyToSubmit: false    
};

// useReducer function
export function formReducer(state, action){
    switch(action.type){
        case 'RESET_VALIDITY':
            return {...state, isValid: INITIAL_STATE.isValid};
        case 'SUBMIT': {
            const postValidity = action.payload.post.trim().length
            const titleValidity = action.payload.title.trim().length
            return {values: action.payload,
                    isValid: {
                        post: postValidity,
                        title: titleValidity
                    },
                    isFormReadyToSubmit: titleValidity && postValidity
                   }
        }    
    }
};