
// formState initial state
export const INITIAL_STATE = {
    isValid:{
        post: true,
        title: true,
        date: ''
    },
    values:{
        post: '',
        title: '',
        tag: '',
        date: ''
    },
    isFormReadyToSubmit: false    
};

// useReducer function
export function formReducer(state, action){
    switch(action.type){
        case 'SET_VALUE':
            // Set values for input forms
            return {...state, values: {...state.values, ...action.payload}};
        case 'CLEAR':
            // Clear input forms
            return {...state, values: INITIAL_STATE.values};
        case 'RESET_VALIDITY':
            // Input form validation now is true
            return {...state, isValid: INITIAL_STATE.isValid};
        case 'SUBMIT': {
            const postValidity = state.values.post.trim().length
            const titleValidity = state.values.title.trim().length
            return {
                    ...state,
                    isValid: {
                        post: postValidity,
                        title: titleValidity,
                        date: new Date()
                    },
                    isFormReadyToSubmit: titleValidity && postValidity
                   }
        }    
    }
};