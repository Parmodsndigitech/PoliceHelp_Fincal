import { CONST } from '../_config';
import { authHeader } from '../_helpers';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from '../_helpers/store';

export const userService = {
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
//  loginMobile

};

function LegalConsultaion(data) {
  let { users } = store.getState()
  let {registerToken, }=users

  const options = {
     url: CONST.BACKEND_URL + `/legalconsultation`,
     method: 'POST',
     headers: {
      'Authorization': `Bearer ${registerToken}`,
      'Content-Type': 'multipart/form-data'
     },
     data: data
  };
  return axios(options)
     .then(data => {
      console.log("LegalConsultaiondata  data",data.data);
        let bucketObj = {
          LegalConsultaiondata: data.data
        }
        return bucketObj;
     });
}
function employeVerify(data) {
  let { users } = store.getState()
  let {registerToken, }=users

  const options = {
     url: CONST.BACKEND_URL + `/employeeverifiocation`,
     method: 'POST',
     headers: {
      'Authorization': `Bearer ${registerToken}`,
      'Content-Type': 'multipart/form-data'
     },
     data: data
  };
  return axios(options)
     .then(data => {
      console.log("Send Employee Varify data",data.data);
        let bucketObj = {
          employeVerifydata: data.data
        }
        return bucketObj;
     });
}



function sendFeedback(data) {
  let { users } = store.getState()
  let {registerToken, }=users

  const options = {
     url: CONST.BACKEND_URL + `/feedback`,
     method: 'POST',
     headers: {
      'Authorization': `Bearer ${registerToken}`,
      'Content-Type': 'multipart/form-data'
     },
     data: data
  };
  return axios(options)
     .then(data => {
      console.log("send Feedback data",data);
        let bucketObj = {
          sendFeedbackdata: data.data
        }
        return bucketObj;
     });
}


function getProfile(data) {
  let { users } = store.getState()
  let {registerToken, registerData}=users

  const options = {
     url: CONST.BACKEND_URL + `/fetchusers/${registerData.id}`,
     method: 'POST',
     headers: {
      'Authorization': `Bearer ${registerToken}`
     },
    //  data: JSON.stringify(data)
  };
  return axios(options)
     .then(data => {
        let bucketObj = {
           getProfileData: data.data
        }
        return bucketObj;
     });
}

function getEnquiryDetails(data) {
  let { users } = store.getState()
  let {registerToken, registerData}=users

  const options = {
     url: CONST.BACKEND_URL + `/userhistory/${registerData.id}`,
     method: 'POST',
     headers: {
      'Authorization': `Bearer ${registerToken}`
     },
    //  data: JSON.stringify(data)
  };
  return axios(options)
     .then(data => {
      // console.log("prfle data is coming ",data);
        let bucketObj = {
          getEnquiryDetailsdata: data.data
        }
        return bucketObj;
     });
}



function ForgetPassword(detailData,email) {

  console.log("calling in a service",email);
  const options = {
    url: CONST.BACKEND_URL + `/forgotpassword/${email}`,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'

    },
    data: detailData
  };
  return axios(options)
    .then(response => {
      console.log('Forget PASSword DATA IN SERVICE', response.data);
      let bucketObj = {
        ForgetData: response.data
      }
      return bucketObj;
    });
}

function logout() {
  let { users } = store.getState()
  const{registerToken}=users;

  // console.log("registerTokenregisterTokenregisterToken",users);
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: CONST.BACKEND_URL+`/logout`,
    headers: {
      'Authorization': `Bearer ${registerToken}`,
    }
  };
  return axios(config)
    .then(response => {
      let bucketObj = {
        LogoutData: response.data
      }
      return bucketObj;
    });
}


function ProfileUpdated(formData) {
                // console.log("ProfileUpdated..File..user.service. :",formData);
  let { users } = store.getState()
  let {registerToken, registerData}=users

  const options = {
    url: CONST.BACKEND_URL + `/profile/${registerData.id}`,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${registerToken}`,
    },
    data: formData
  };
  return axios(options)
    .then(response => {
      // console.log('ProfileUpdated ... user.service..', response?.data);
      let bucketObj = {
        ProfileUpdateddata: response.data
      }
      return bucketObj;
    });
}
function login(formData) {
  let { users } = store.getState()
  const options = {
    url: CONST.BACKEND_URL + `/login`,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  };
  return axios(options)
    .then(response => {
  console.log('parmod  Login Done....reponse...',options)
      let bucketObj = {
        loginData: response.data
      }
      return bucketObj;
    });
}
// ######### 
// function loginMobile(formData) {
//   let { users } = store.getState()
//   const options = {
//     url: CONST.BACKEND_URL + `/login-with-mobile`,
//     method: 'POST',
//     headers: {
//       'Content-Type': 'multipart/form-data'
//     },
//     data: formData
//   };
//   return axios(options)
//     .then(response => {
//   console.log('parmod  Login Done..MObile..reponse...',options)
//       let bucketObj = {
//         loginData: response.data
//       }
//       return bucketObj;
//     });
// }


function register(detailData) {
  console.log('aaaaaaaaaaaaaaaa', detailData);
  const options = {
    url: CONST.BACKEND_URL + `/register`,
    method: 'POST',
    headers: {
      // 'Content-Type':'multipart/form-data'
       'Content-Type': 'application/json'
    },
    data: detailData
  };
  return axios(options)
    .then(response => {
      console.log('REGISTER DATA IN SERVICE', response.data);
      let bucketObj = {
        registerData: response.data
      }
      return bucketObj;
    });
}


// function getAddressList(data) {
//   let { users } = store.getState()
//   const options = {
//     url: CONST.BACKEND_URL + `/getAddressList`,
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       "Authorization": users ? "Bearer " + users.userToken : null
//     },
//     data: JSON.stringify(data)
//   };
//   return axios(options)
//     .then(response => {
//       // console.log('getAddress----------->', response.data.data.data);
//       let bucketObj = {
//         getAddressData: response.data.data.data
//       }
//       return bucketObj;
//     });
// }

// function createWallet(data) {
//   let { users } = store.getState()
//   const options = {
//     url: CONST.BACKEND_URL + `/createAddress`,
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       "Authorization": users ? "Bearer " + users.userToken : null
//     },
//     data: JSON.stringify(data)
//   };
//   return axios(options)
//     .then(response => {
//       console.log('createWallet----------->', response.data);
//       let bucketObj = {
//         createWalletData: response.data
//       }
//       return bucketObj;
//     });
// }

// function uploadProfileImg(image) {
//   let { users } = store.getState()
//   // console.log("=========>", data, users.tokensss);
//   var data = new FormData();
//   data.append('image', {
//     uri: image.path,
//     type: image.mime,
//     name: image.path,
//   });

//   var config = {
//     method: 'post',
//     // maxBodyLength: Infinity,
//     url: 'https://gcn-wallet-backend.vercel.app/api/v1/uploadImageProfile',
//     headers: {
//       'Authorization': users ? "Bearer " + users.userToken : null,
//       'Content-Type': 'multipart/form-data',
//     },
//     data: data
//   };
//   return axios(config)
//     .then(users => {
//       let bucketObj = {
//         uploadedImg: users.data
//       }
//       // console.log("IMAGE UPLOAD SERVICE  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", users.data);
//       return bucketObj;
//     });
// }


// function getTX() {
//   let { users } = store.getState()
//   const options = {
//     url: CONST.BACKEND_URL + `/getTXByAddress`,
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       "Authorization": users ? "Bearer " + users.userToken : null
//     },
//     data: { address: users && users.getSavedAddress && users.getSavedAddress.data }
//   };
//   return axios(options)
//     .then(response => {
//       // console.log('GET TRANSACTION API IN SERVICE', response.data.data);
//       let bucketObj = {
//         getTX: response.data.data
//       }
//       return bucketObj;
//     });
// }

// function sendCoin(data) {
//   let { users } = store.getState()
//   const options = {
//     url: CONST.BACKEND_URL + `/sendCoin`,
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       "Authorization": users ? "Bearer " + users.userToken : null
//     },
//     data: JSON.stringify(data)
//   };
//   return axios(options)
//     .then(response => {
//       console.log('SEND COIN API IN SERVICE', response.data);
//       let bucketObj = {
//         sendCoin: response.data
//       }
//       return bucketObj;
//     })
//     .catch(error => {
//       console.log('ERRORRRRRRR  =>', error);
//     })
// }

// function getWalletList(data) {
//   let { users } = store.getState()
//   console.log('===== SELECTED WALLET ADDRESS =======>', users && users.getSavedAddress && users.getSavedAddress.data);
//   const options = {
//     url: CONST.BACKEND_URL + `/getWalletListByAddress`,
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       "Authorization": users ? "Bearer " + users.userToken : null
//     },
//     data: JSON.stringify({ address: users && users.getSavedAddress && users.getSavedAddress.data })
//   };
//   return axios(options)
//     .then(response => {
//       console.log('GET WALLET API IN SERVICE', response.data.data);
//       let bucketObj = {
//         getWalletList: response.data.data
//       }
//       return bucketObj;
//     });
// }

// function addContractAddress(data) {
//   let { users } = store.getState()
//   const options = {
//     url: CONST.BACKEND_URL + `/addContractAddress`,
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       "Authorization": users ? "Bearer " + users.userToken : null
//     },
//     data: JSON.stringify(data)
//   };
//   return axios(options)
//     .then(response => {
//       console.log('addContractAddress IN SERVICE', response.data);
//       let bucketObj = {
//         addResponce: response.data
//       }
//       return bucketObj;
//     })
//     .catch(error => {
//       console.log('EERRREEERRRRRR  =>', error);
//     })
// }

// function updateProfile(formData) {
//   let { users } = store.getState()
//   const options = {
//     url: CONST.BACKEND_URL + `/updateProfile`,
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       "Authorization": users ? "Bearer " + users.userToken : null
//     },
//     data: JSON.stringify(formData)
//   };
//   return axios(options)
//     .then(response => {
//       console.log('UPDATE PROFILE IN SERVICE', response.data);
//       let bucketObj = {
//         updateProfile: response.data
//       }
//       return bucketObj;
//     });
// }

// function getProfile() {
//   let { users } = store.getState()
//   const options = {
//     url: CONST.BACKEND_URL + `/getProfile`,
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       "Authorization": users ? "Bearer " + users.userToken : null
//     },
//     // data: JSON.stringify(data)
//   };
//   return axios(options)
//     .then(response => {
//       // console.log('GET PROFILE IN SERVICE', response.data);
//       let bucketObj = {
//         getProfile: response.data
//       }
//       return bucketObj;
//     });
// }

// function forgotUpdatePassword(formData) {
//   let { users } = store.getState()
//   const options = {
//     url: CONST.BACKEND_URL + `/forgotUpdatePassword`,
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     data: JSON.stringify(formData)
//   };
//   return axios(options)
//     .then(response => {
//       console.log('forgotUpdatePassword DATA IN SERVICE', response.data);
//       let bucketObj = {
//         forgotUpdatePassword: response.data
//       }
//       return bucketObj;
//     });
// }

// function forgetPassword(formData) {
//   let { users } = store.getState()
//   const options = {
//     url: CONST.BACKEND_URL + `/forgotPassword`,
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     data: JSON.stringify(formData)
//   };
//   return axios(options)
//     .then(response => {
//       console.log('FORGET PASS DATA IN SERVICE', response.data);
//       let bucketObj = {
//         forgetPassword: response.data
//       }
//       return bucketObj;
//     });
// }

// function loginOtp(data) {
//   let { users } = store.getState()
//   const options = {
//     url: CONST.BACKEND_URL + `/validateLoginOtp`,
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     data: JSON.stringify(data)
//   };
//   return axios(options)
//     .then(response => {
//       console.log('LOGIN-OTP DATA IN SERVICE', response.data);
//       let bucketObj = {
//         loginOtpData: response.data
//       }
//       return bucketObj;
//     });
// }



// function registerOtp(detailData) {
//   const options = {
//     url: CONST.BACKEND_URL + `/validateRegisterOtp`,
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     data: JSON.stringify(detailData)
//   };
//   return axios(options)
//     .then(response => {
//       console.log('REGISTER DATA IN SERVICE', response.data);
//       let bucketObj = {
//         registerOtp: response.data
//       }
//       return bucketObj;
//     });
// }





