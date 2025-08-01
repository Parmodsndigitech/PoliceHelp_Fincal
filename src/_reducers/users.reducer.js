import { userConstants } from '../_constants';

export function users(state = {}, action) {
  switch (action.type) {

  

    case userConstants.GET_ENQUIRY_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GET_ENQUIRY_SUCCESS:
      return {
        ...state,

        loading: false,
        getEnquirydata:action.users.getEnquiryDetailsdata.items

        
      };
    case userConstants.GET_ENQUIRY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case userConstants.LEGEL_CONSITANCY_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.LEGEL_CONSITANCY_SUCCESS:
      return {
        ...state,

        loading: false,

        
      };
    case userConstants.LEGEL_CONSITANCY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case userConstants.EMP_VARIFY_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.EMP_VARIFY_SUCCESS:
      return {
        ...state,

        loading: false,

        
      };
    case userConstants.EMP_VARIFY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

      
      
    case userConstants.SEND_FEEDBACK_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.SEND_FEEDBACK_SUCCESS:
      return {
        ...state,

        loading: false,

        
      };
    case userConstants.SEND_FEEDBACK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };


    case userConstants.USER_FORGET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.USER_FORGET_PASSWORD_SUCCESS:
      return {
        ...state,

        loading: false,
        
      };
    case userConstants.USER_FORGET_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case userConstants.USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.USER_REGISTER_SUCCESS:
      return {
        ...state,

        loading: false,
        registerToken: action.users.registerData.authorization.token,
        registerData:action.users.registerData.user,
      };
    case userConstants.USER_REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };


    case userConstants.GET_PROFILE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GET_PROFILE_SUCCESS:
      return {
        ...state,

        loading: false,
        registerData:action.users.getProfileData.fetchusers[0],
      };
    case userConstants.GET_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };


    case userConstants.USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.USER_LOGIN_SUCCESS:
      return {
        ...state,

        loading: false,
        registerToken: action.users.loginData.authorization.token,
        registerData:action.users.loginData.user,
      };
    case userConstants.USER_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };


      case userConstants.LOGOUT_SUCCESS:
        return {
          ...state,
          registerToken:null,
          registerData:null,

      
        };


    default:
      return state
  }
}