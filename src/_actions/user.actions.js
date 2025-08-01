import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './alert.actions';
export const userActions = {
    register,
    login,
    logout,
    ForgetPassword,
    ProfileUpdated,
    getProfile,
    sendFeedback,
    employeVerify,
    LegalConsultaion,
    getEnquiryDetails,
    // loginMobile
}
function getEnquiryDetails(formData, props) {
    return dispatch => {
        dispatch(request());
        userService.getEnquiryDetails(formData).then(
            users => {
                // console.log("getEnquiryDetails..File..user.actions.:",users.getEnquiryDetailsdata);
                if (users.getEnquiryDetailsdata && users.getEnquiryDetailsdata.error) {
                    dispatch(alertActions.error(users.getEnquiryDetailsdata.message));
                    dispatch(failure(error));
                } else {
                    let message = users && users.getEnquiryDetailsdata && users.getEnquiryDetailsdata.message ? users.getEnquiryDetailsdata.message : ''
                    dispatch(success(users));
                }
            },
        );
    };
    function request() { return { type: userConstants.GET_ENQUIRY_REQUEST }; }
    function success(users) { return { type: userConstants.GET_ENQUIRY_SUCCESS, users }; }
    function failure(error) { return { type: userConstants.GET_ENQUIRY_FAILURE, error }; }
}
function LegalConsultaion(formData, props) {
    return dispatch => {
        dispatch(request());
        userService.LegalConsultaion(formData).then(
            users => {
                // console.log("LegalConsultaion..File..user.actions.:",users.LegalConsultaiondata);
                if (users.LegalConsultaiondata && users.LegalConsultaiondata.error) {
                    dispatch(alertActions.error(users.LegalConsultaiondata.message));
                    dispatch(failure(error));
                } else {
                    let message = users && users.LegalConsultaiondata && users.LegalConsultaiondata.message ? users.LegalConsultaiondata.message : ''
                    dispatch(alertActions.success(message));
                    dispatch(success(users));
                    props.navigation.navigate('LegalLoading')
                    props.navigation.reset({
                      index: 0,
                      routes: [{ name: 'LegalLoading' }]
                    });
                }
            },
        );
    };
    function request() { return { type: userConstants.LEGEL_CONSITANCY_REQUEST }; }
    function success(users) { return { type: userConstants.LEGEL_CONSITANCY_SUCCESS, users }; }
    function failure(error) { return { type: userConstants.LEGEL_CONSITANCY_FAILURE, error }; }
}
function employeVerify(formData, props) {
    return dispatch => {
        dispatch(request());
        userService.employeVerify(formData).then(
            users => {
                // console.log("employeVerify..File..user.actions.:",users.employeVerifydata);
                if (users.employeVerifydata && users.employeVerifydata.error) {
                    dispatch(alertActions.error(users.employeVerifydata.message));
                    dispatch(failure(error));
                } else {
                    let message = users && users.employeVerifydata && users.employeVerifydata.message ? users.employeVerifydata.message : ''
                    dispatch(alertActions.success(message));
                    dispatch(success(users));
                    props.navigation.navigate('EmpLoading')
                    props.navigation.reset({
                      index: 0,
                      routes: [{ name: 'EmpLoading' }]
                    });
                }
            },
        );
    };
    function request() { return { type: userConstants.EMP_VARIFY_REQUEST }; }
    function success(users) { return { type: userConstants.EMP_VARIFY_SUCCESS, users }; }
    function failure(error) { return { type: userConstants.EMP_VARIFY_FAILURE, error }; }
}
function sendFeedback(formData, props) {
    return dispatch => {
        dispatch(request());
        userService.sendFeedback(formData).then(
            users => {
                // console.log("sendFeedback..File..user.actions. :",users.sendFeedbackdata);
                if (users.sendFeedbackdata && users.sendFeedbackdata.error) {
                    dispatch(alertActions.error(users.sendFeedbackdata.message));
                    dispatch(failure(error));
                } else {
                    let message = users && users.sendFeedbackdata && users.sendFeedbackdata.message ? users.sendFeedbackdata.message : ''
                    dispatch(alertActions.success(message));
                    dispatch(success(users));
                    props.dispatch(userActions.getProfile())
                    props.navigation.navigate('FeedLoading')
                    props.navigation.reset({
                      index: 0,
                      routes: [{ name: 'FeedLoading' }]
                    });
                }
            },
        );
    };
    function request() { return { type: userConstants.SEND_FEEDBACK_REQUEST }; }
    function success(users) { return { type: userConstants.SEND_FEEDBACK_SUCCESS, users }; }
    function failure(error) { return { type: userConstants.SEND_FEEDBACK_FAILURE, error }; }
}
function getProfile() {
    return dispatch => {
       dispatch(request());
       userService.getProfile()
          .then(
             users => {
                // console.log('getProfile..File..user.actions.', users.getProfileData.fetchusers[0]);
                dispatch(success(users));
             },
             error => {
                dispatch(alertActions.error(error));
                dispatch(failure(error))
             }
          );
    };
    function request() { return { type: userConstants.GET_PROFILE_REQUEST } }
    function success(users) { return { type: userConstants.GET_PROFILE_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GET_PROFILE_FAILURE, error } }
}
function logout(props) {
    return dispatch => {
        userService.logout().then(
            users => {
                // console.log("logout..File..user.actions.",users.LogoutData);
                if (users.LogoutData && users.LogoutData.error) {
                    dispatch(alertActions.error(users.registerData.message));
                    dispatch(failure(error));
                } else {
                    let message = users && users.LogoutData && users.LogoutData.message ? users.LogoutData.message : ''
                    props.navigation.navigate('Welcome');
                    props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'Welcome' }]
                      });
                    dispatch(success(users)); 
                }
            })
    };
    function success() { return { type: userConstants.LOGOUT_SUCCESS, }; }
}
function ForgetPassword(detailData, props) {
    const email=props.route.params.emailId;
    return dispatch => {
        dispatch(request());
        userService.ForgetPassword(detailData,email).then(
            users => {
                // console.log("ForgetPassword..File..user.actions", users.ForgetData);
                if (users.ForgetData && users.ForgetData.error) {
                    dispatch(alertActions.error(users.ForgetData.message));
                    dispatch(failure(error));
                } else {
                    let message = users && users.ForgetData && users.ForgetData.message ? users.ForgetData.message : ''
                    dispatch(alertActions.success(message));
                    props.navigation.navigate('Login');
                    dispatch(success(users));
                }
            },
        );
    };
    function request() { return { type: userConstants.USER_FORGET_PASSWORD_REQUEST }; }
    function success(users) { return { type: userConstants.USER_FORGET_PASSWORD_SUCCESS, users }; }
    function failure(error) { return { type: userConstants.USER_FORGET_PASSWORD_FAILURE, error }; }
}
function register(detailData, props) {
    return dispatch => {
        dispatch(request());
        userService.register(detailData).then(
            users => {
                // console.log("register..File..user.actions", users.registerData);
                if (users.registerData && users.registerData.error) {
                    dispatch(alertActions.error(users.registerData.message));
                    dispatch(failure(error));
                } else {
                    let message = users && users.registerData && users.registerData.message ? users.registerData.message : ''
                    dispatch(alertActions.success(message));
                    props.navigation.navigate('Loading');
                    dispatch(success(users));
                }
            },

        );
    };
    function request() { return { type: userConstants.USER_REGISTER_REQUEST }; }
    function success(users) { return { type: userConstants.USER_REGISTER_SUCCESS, users }; }
    function failure(error) { return { type: userConstants.USER_REGISTER_FAILURE, error }; }
}
function ProfileUpdated(formData, props) {
    return dispatch => {
        dispatch(request());
        userService.ProfileUpdated(formData).then(
            users => {
                // console.log("ProfileUpdated..File..user.actions :",users);
                if (users.ProfileUpdateddata && users.ProfileUpdateddata.error) {
                    dispatch(alertActions.error(users.ProfileUpdateddata.message));
                    dispatch(failure(error));
                } else {
                    let message = users && users.ProfileUpdateddata && users.ProfileUpdateddata.message ? users.ProfileUpdateddata.message : ''
                    dispatch(alertActions.success(message));
                    dispatch(success(users));
                    props.dispatch(userActions.getProfile())
                    props.navigation.navigate('Home')
                    props.navigation.reset({
                      index: 0,
                      routes: [{ name: 'Home' }]
                    });
                }
            },
        );
    };
    function request() { return { type: userConstants.PROFILE_UPDATE_REQUEST }; }
    function success(users) { return { type: userConstants.PROFILE_UPDATE_SUCCESS, users }; }
    function failure(error) { return { type: userConstants.PROFILE_UPDATE_FAILURE, error }; }
}
function login(formData, props) {
    return dispatch => {
        dispatch(request());
        userService.login(formData).then(
            users => {
                // console.log("login..File..user.actions :",users.loginData);
                if (users.loginData && users.loginData.error) {
                    dispatch(alertActions.error(users.loginData.message));
                    dispatch(failure(error));
                } else {
                    let message = users && users.loginData && users.loginData.message ? users.loginData.message : ''
                    dispatch(alertActions.success("User Login Successfully "));
                    dispatch(success(users));
                    props.navigation.navigate('Home')
                    props.navigation.reset({
                      index: 0,
                      routes: [{ name: 'Home' }]
                    });
                }
            },
        );
    };
    function request() { return { type: userConstants.USER_LOGIN_REQUEST }; }
    function success(users) { return { type: userConstants.USER_LOGIN_SUCCESS, users }; }
    function failure(error) { return { type: userConstants.USER_LOGIN_FAILURE, error }; }
}


// function loginMobile(formData, props) {
//     return dispatch => {
//         dispatch(request());
//         userService.loginMobile(formData).then(
//             users => {
//                 console.log("login..File..user.Login Mobile Actiion :",users);
//                 if (users.loginData && users.loginData.error) {
//                     dispatch(alertActions.error(users.loginData.message));
//                     dispatch(failure(error));
//                 } else {
//                     let message = users && users.loginData && users.loginData.message ? users.loginData.message : ''
//                     dispatch(alertActions.success("User Login Successfully "));
//                     dispatch(success(users));
//                     props.navigation.navigate('Home')
//                     props.navigation.reset({
//                       index: 0,
//                       routes: [{ name: 'Home' }]
//                     });
//                 }
//             },
//         );
//     };
//     function request() { return { type: userConstants.USER_LOGIN_REQUEST_MOBILE }; }
//     function success(users) { return { type: userConstants.USER_LOGIN_SUCCESS_MOBILE, users }; }
//     function failure(error) { return { type: userConstants.USER_LOGIN_FAILURE_MOBILE, error }; }
// }










// #################################### 
// function save_Wallet_address(data) {
//     return dispatch => {
//         dispatch(success({ data }));
//         dispatch(userActions.getWalletList())
//     };
//     function success(data) { return { type: userConstants.WALLET_SUCCESS, data } }
// }
// function getAddressList(data) {
//     return dispatch => {
//         dispatch(request());
//         userService.getAddressList(data).then(
//             users => {
//                 if (users.getAddressData && users.getAddressData.error) {
//                     dispatch(failure(error));
//                 } else {
//                     dispatch(success(users));
//                 }
//             },
//         );
//     };
//     function request() { return { type: userConstants.GET_ADDRESS_REQUEST }; }
//     function success(users) { return { type: userConstants.GET_ADDRESS_SUCCESS, users }; }
//     function failure(error) { return { type: userConstants.GET_ADDRESS_FAILURE, error }; }
// }

// function createWallet(data, props) {
//     return dispatch => {
//         dispatch(request());
//         userService.createWallet(data).then(
//             users => {
//                 if (users.createWalletData && users.createWalletData.error) {
//                     dispatch(alertActions.error(users.createWalletData.message));
//                     dispatch(failure(error));
//                 } else {
//                     let message = users && users.createWalletData && users.createWalletData.messages ? users.createWalletData.message : 'Wallet created successfully'
//                     dispatch(alertActions.success(message));
//                     dispatch(userActions.getAddressList())
//                     dispatch(success(users));
//                 }
//             },
//         );
//     };
//     function request() { return { type: userConstants.CREATE_WALLET_REQUEST }; }
//     function success(users) { return { type: userConstants.CREATE_WALLET_SUCCESS, users }; }
//     function failure(error) { return { type: userConstants.CREATE_WALLET_FAILURE, error }; }
// }


// function uploadProfileImg(image) {
//     return dispatch => {
//         dispatch(request());
//         userService.uploadProfileImg(image).then(
//             users => {
//                 dispatch(success(users));
//                 dispatch(userActions.getProfile())
//             },
//             error => {
//                 dispatch(failure(error));
//             },
//         );
//     };
//     function request() { return { type: userConstants.UPLOAD_PROFILE_IMG_REQUEST }; }
//     function success(users) { return { type: userConstants.UPLOAD_PROFILE_IMG_SUCCESS, users }; }
//     function failure(error) { return { type: userConstants.UPLOAD_PROFILE_IMG_FAILURE, error }; }
// }


// function getTX() {
//     return dispatch => {
//         dispatch(request());
//         userService.getTX().then(
//             users => {
//                 dispatch(success(users));
//             },
//             error => {
//                 dispatch(failure(error));
//             },
//         );
//     };
//     function request() { return { type: userConstants.GET_TX_REQUEST }; }
//     function success(users) { return { type: userConstants.GET_TX_SUCCESS, users }; }
//     function failure(error) { return { type: userConstants.GET_TX_FAILURE, error }; }
// }

// function sendCoin(data, props) {
//     return dispatch => {
//         dispatch(request());
//         userService.sendCoin(data).then(
//             users => {
//                 if (users.sendCoin && users.sendCoin.error) {
//                     dispatch(alertActions.error(users.sendCoin.message));
//                     dispatch(failure(error));
//                 } else {
//                     let message = users && users.sendCoin && users.sendCoin.message ? users.sendCoin.message : ''
//                     dispatch(alertActions.success(message));
//                     dispatch(success(users));
//                     getWalletList()
//                     getTX()
//                     setTimeout(() => {
//                         props.navigation.navigate('Notification');
//                     }, 1000);
//                 }
//             },
//         );
//     };
//     function request() { return { type: userConstants.SEND_COIN_REQUEST }; }
//     function success(users) { return { type: userConstants.SEND_COIN_SUCCESS, users }; }
//     function failure(error) { return { type: userConstants.SEND_COIN_FAILURE, error }; }
// }

// function getWalletList(data) {
//     return dispatch => {
//         dispatch(request());
//         userService.getWalletList(data).then(
//             users => {
//                 dispatch(success(users));
//             },
//             error => {
//                 dispatch(failure(error));
//             },
//         );
//     };
//     function request() { return { type: userConstants.GET_WALLET_LIST_REQUEST }; }
//     function success(users) { return { type: userConstants.GET_WALLET_LIST_SUCCESS, users }; }
//     function failure(error) { return { type: userConstants.GET_WALLET_LIST_FAILURE, error }; }
// }

// function addContractAddress(data, props,) {
//     return dispatch => {
//         dispatch(request());
//         userService.addContractAddress(data).then(
//             users => {
//                 console.log('------------->', users);
//                 if (users.addResponce && users.addResponce.error) {
//                     // dispatch(alertActions.error(users && users.addResponce && users.addResponce.message ? users.addResponce.message : ''));
//                     dispatch(Alert.alert('Alert!', users.addResponce.message))
//                     // dispatch(ActivityIndicator.alert('Alert!', users.addResponce.message))
//                     dispatch(failure(error));
//                 } else {
//                     let message = users && users.addResponce && users.addResponce.message ? users.addResponce.message : ''
//                     dispatch(alertActions.success(message));
//                     dispatch(success(users));
//                     setTimeout(() => {
//                         props.navigation.navigate('Dashboard');
//                     }, 1000);
//                 }
//             },
//         );
//     };
//     function request() { return { type: userConstants.ADD_CONTRACT_ADDRESS_REQUEST }; }
//     function success(users) { return { type: userConstants.ADD_CONTRACT_ADDRESS_SUCCESS, users }; }
//     function failure(error) { return { type: userConstants.ADD_CONTRACT_ADDRESS_FAILURE, error }; }
// }




// function updateProfile(formData, props, setEditProfile) {
//     return dispatch => {
//         dispatch(request());
//         userService.updateProfile(formData).then(
//             users => {
//                 dispatch(success(users));
//                 // Alert.alert('Success!', 'Succeessfully Updated');
//                 dispatch(setEditProfile(true))
//                 setTimeout(() => {
//                     props.navigation.navigate('Dashboard')
//                 }, 1000);
//             },
//             error => {
//                 dispatch(failure(error));
//             },
//         );
//     };
//     function request() { return { type: userConstants.UPDATE_PROFILE_REQUEST }; }
//     function success(users) { return { type: userConstants.UPDATE_PROFILE_SUCCESS, users }; }
//     function failure(error) { return { type: userConstants.UPDATE_PROFILE_FAILURE, error }; }
// }

// function getProfile() {
//     return dispatch => {
//         dispatch(request());
//         userService.getProfile().then(
//             users => {
//                 dispatch(success(users));
//             },
//             error => {
//                 dispatch(failure(error));
//             },
//         );
//     };
//     function request() { return { type: userConstants.GET_PROFILE_REQUEST }; }
//     function success(users) { return { type: userConstants.GET_PROFILE_SUCCESS, users }; }
//     function failure(error) { return { type: userConstants.GET_PROFILE_FAILURE, error }; }
// }

// function forgotUpdatePassword(formData, props, Alert) {
//     return dispatch => {
//         dispatch(request());
//         userService.forgotUpdatePassword(formData).then(
//             users => {
//                 dispatch(success(users));
//                 Alert.alert('We have sent an email, please verify your account')
//                 setTimeout(() => {
//                     props.navigation.navigate('Login')
//                 }, 1000);
//             },
//             error => {
//                 dispatch(failure(error))
//             },
//         );
//     };
//     function request() { return { type: userConstants.FORGET_UPDATE_PASS_REQUEST }; }
//     function success(users) { return { type: userConstants.FORGET_UPDATE_PASS_SUCCESS, users }; }
//     function failure(error) { return { type: userConstants.FORGET_UPDATE_PASS_FAILURE, error }; }
// }

// function forgetPassword(formData, props) {
//     return dispatch => {
//         dispatch(request());
//         userService.forgetPassword(formData).then(
//             users => {
//                 dispatch(success(users));
//                 let message = 'We have sent an email, please verify your account'
//                 setTimeout(() => {
//                     props.navigation.navigate('ForgetUpdatePass')
//                 }, 1000);
//             },
//             error => {
//                 dispatch(failure(error))
//             },
//         );
//     };
//     function request() { return { type: userConstants.FORGET_PASSWORD_REQUEST }; }
//     function success(users) { return { type: userConstants.FORGET_PASSWORD_SUCCESS, users }; }
//     function failure(error) { return { type: userConstants.FORGET_PASSWORD_FAILURE, error }; }
// }

// function loginOtp(data, props) {
//     return dispatch => {
//         dispatch(request());
//         userService.loginOtp(data).then(
//             users => {
//                 if (users.loginOtpData && users.loginOtpData.error) {
//                     dispatch(alertActions.error(users.loginOtpData.message));
//                     dispatch(failure(error));
//                 } else {
//                     let message = users && users.loginOtpData && users.loginOtpData.message ? users.loginOtpData.message : ''
//                     dispatch(alertActions.success(message));

//                     dispatch(success(users));
//                     setTimeout(() => {
//                         props.navigation.navigate('Dashboard');
//                     }, 1000);
//                 }
//             },
//         );
//     };
//     function request() { return { type: userConstants.USER_LOGIN_OTP_REQUEST }; }
//     function success(users) { return { type: userConstants.USER_LOGIN_OTP_SUCCESS, users }; }
//     function failure(error) { return { type: userConstants.USER_LOGIN_OTP_FAILURE, error }; }
// }



// function registerOtp(detailData, props) {
//     return dispatch => {
//         dispatch(request());
//         userService.registerOtp(detailData).then(
//             users => {
//                 if (users.registerOtp && users.registerOtp.error) {
//                     dispatch(alertActions.error(users.registerOtp.message));
//                     dispatch(failure(error));
//                 } else {
//                     let message = users && users.registerOtp && users.registerOtp.message ? users.registerOtp.message : ''
//                     dispatch(alertActions.success(message));

//                     dispatch(success(users));
//                     setTimeout(() => {
//                         props.navigation.navigate('Dashboard');
//                     }, 1000);
//                 }
//             },
//         );
//     };
//     function request() { return { type: userConstants.USER_REGISTER_OTP_REQUEST }; }
//     function success(users) { return { type: userConstants.USER_REGISTER_OTP_SUCCESS, users }; }
//     function failure(error) { return { type: userConstants.USER_REGISTER_OTP_FAILURE, error }; }
// }



