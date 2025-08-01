
export function authHeader() {

  let user = {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzNlNTgyOTlmZDM2NTE2YTg2MjViNGQiLCJpYXQiOjE2NzM1OTA2MTd9.-368CyfQ74hRQzeiALXiIehC_Mq-plyIsyULkL5CLNE"
  }
  // //console.log('userToken:------- c///-------------->>> ',user)

  if (user && user.token) {
    // //console.log('only token:------- c///-------------->>> ',user.token)
    return { 'Authorization': 'Bearer ' + user.token };
  } else {
    return {};
  }
}