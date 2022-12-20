const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                validationError: null,
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                authenticated: true,
                validationError: null,
            };
        case 'ERROR':
            return {
                ...state,
                validationError: action.payload,
            };
        case 'USER_TYPE_JOB_SEEKER':
            return {
                ...state,
                isJobSeeker: true,
            };
        case 'USER_TYPE_EMPLOYER':
            return {
                ...state,
                isEmployer: true,
            };
        case 'LOGOUT':
            return {
                ...state,
                authenticated: false,
                isJobSeeker: false,
                isEmployer: false
            };
        case 'CHECK_AUTH_STATUS':
            return {
                ...state,
                authenticated: action.payload
            }
            
        default:
            return state; 
    }
}
export default reducer;