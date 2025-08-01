// import { alertConstants } from '../_constants';//Raman
// // import { Toast } from "native-base";
// import { Toast } from 'react-native-toast-message/lib/src/Toast';
// import {
//     ToastAndroid,
//     Platform,
//     AlertIOS,
// } from 'react-native';

// export const alertActions = {
//     success,
//     error,
//     clear
// };

// function success(message) {
//     let messagetest = message;
//     if (Platform.OS === 'android') {
//         Toast.show({
//             text: messagetest,
//             type: "success"
//         })
//     } else {
//         // AlertIOS.alert(messagetest);
//         Toast.show({
//             text: messagetest,
//             type: "success"
//         })

//         // Toast.show(messagetest, Toast.LONG);
//     }
//     return { type: alertConstants.SUCCESS, message };
// }

// function error(message) {
//     let messagetest = message;
//     if (Platform.OS === 'android') {
//         Toast.show({
//             text: messagetest,
//             type: "warning"
//         })
//     } else {
//         Toast.show({
//             text: messagetest,
//             type: "warning"
//         })

//     }
//     return { type: alertConstants.ERROR, message: messagetest };
// }

// function clear() {
//     return { type: alertConstants.CLEAR };
// }




import { alertConstants } from '../_constants';
import Toast from 'react-native-toast-message'

import {

    Platform,
    AlertIOS,
} from 'react-native';

export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    let messagetest = message;
    if (Platform.OS === 'android') {
        Toast.show({
            text1: messagetest,
            type: "success"
        })
    } else {
        Toast.show({
            text1: messagetest,
            type: "success"
        })
    }
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    let messagetest = message;
    if (Platform.OS === 'android') {
        Toast.show({
            text1: messagetest,
            type: "error"
        })
    } else {
        Toast.show({
            text1: messagetest,
            type: "error"
        })
    }
    return { type: alertConstants.ERROR, message: messagetest };
}

function clear() {
    return { type: alertConstants.CLEAR };
}
