export const CONST = {

  // BACKEND_URL: 'https://sndigitech.in/police_help/api',
  BACKEND_URL: 'https://policehelp.in/api',

};
//  registerApi: `${BASEURL}user/signup/admin`,
export const 
CONSTENDPOINT = {
  SEND_OTP_MAIL:`${CONST.BACKEND_URL}/send-otp`,
  VERIFY_OTP_MAIL:`${CONST.BACKEND_URL}/verify-otp`,

  SEND_MOBILE_OTP:`${CONST.BACKEND_URL}/send-mobile-otp`,
  VERIFY_OTP_MOBILE:`${CONST.BACKEND_URL}/verify-mobile-otp`,
  REGISTER_USER:`${CONST.BACKEND_URL}/register`,
  MEDICAL_ADVISORY_FORM:`${CONST.BACKEND_URL}/patients`,
  LOGIN_WITH_MOBILE:`${CONST.BACKEND_URL}/login-with-mobile`,
  CREATEPAYMENTSEND:`${CONST.BACKEND_URL}/razorpay/create-order`,
  VERIFYPAYMENT:`${CONST.BACKEND_URL}/verify-payment`,







};
