import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import { connect } from 'react-redux';
import Sidebar from './Sidebar';
import Login from '../pages/Login/Login';
import Intro1 from '../pages/Intro/Intro1';
import Intro2 from '../pages/Intro/Intro2';
import Intro3 from '../pages/Intro/Intro3';
import EmployeeVerification from '../pages/EmployeeVerification/EmployeeVerification';
import LegalConsultation from '../pages/LegalConsultation/LegalConsultation';
import Loading from '../pages/Loading/Loading';
import PoliceStationEnquiey from '../pages/PoliceStationEnquiey/PoliceStationEnquiey';
import PoliceStationEnquieyresult from '../pages/PoliceStationEnquiey/PoliceStationEnquieyresult';
import PreviusEnquiry from '../pages/PreviusEnquiry/PreviusEnquiry';
import Profile from '../pages/Profile/Profile';
import SignUp from '../pages/SignUp/SignUp';
import Splash from './Splash';
import Welcome from './Welcome';
import Feedback from '../pages/Feedback/Feedback';
import EmpLoading from '../pages/EmployeeVerification/EmpLoading';
import LegalLoading from '../pages/LegalConsultation/LegalLoading';
import FeedLoading from '../pages/Feedback/FeedLoading';
import ForgetPassword from '../pages/ForgetPassword/ForgetPassword';
import Subsciption_plan from '../pages/PoliceStationEnquiey/Subsciption_plan';

const Stack = createNativeStackNavigator();
const Route = props => {
    const [loarding, setloarding] = useState(true);
    const { users } = props;
    const { registerToken, registerData } = users;
    useEffect(() => {
        setTimeout(() => {
            setloarding(false);
        }, 2000);
    }, []);
    return (
        <>
            {loarding ? (
                <>
                    <Splash />
                </>
            ) : (
                <NavigationContainer>
                    {registerToken ? (
                        <Stack.Navigator initialRouteName="Sidebar">
                            <Stack.Screen
                                name="Home"
                                component={Sidebar}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Login"
                                component={Login}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Sidebar"
                                component={Sidebar}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Intro1"
                                component={Intro1}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Intro2"
                                component={Intro2}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Intro3"
                                component={Intro3}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="EmployeeVerification"
                                component={EmployeeVerification}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="LegalConsultation"
                                component={LegalConsultation}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Loading"
                                component={Loading}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="PoliceStationEnquiey"
                                component={PoliceStationEnquiey}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="PoliceStationEnquieyresult"
                                component={PoliceStationEnquieyresult}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="PreviusEnquiry"
                                component={PreviusEnquiry}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Profile"
                                component={Profile}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="SignUp"
                                component={SignUp}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Splash"
                                component={Splash}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Welcome"
                                component={Welcome}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Feedback"
                                component={Feedback}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="EmpLoading"
                                component={EmpLoading}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="LegalLoading"
                                component={LegalLoading}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="FeedLoading"
                                component={FeedLoading}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="ForgetPassword"
                                component={ForgetPassword}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Subsciption_plan"
                                component={Subsciption_plan}
                                options={{ headerShown: false }}
                            />
                        </Stack.Navigator>
                    ) : (
                        <Stack.Navigator initialRouteName="Intro1">
                            <Stack.Screen
                                name="Login"
                                component={Login}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Home"
                                component={Sidebar}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Sidebar"
                                component={Sidebar}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Intro1"
                                component={Intro1}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Intro2"
                                component={Intro2}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Intro3"
                                component={Intro3}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="EmployeeVerification"
                                component={EmployeeVerification}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="LegalConsultation"
                                component={LegalConsultation}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Loading"
                                component={Loading}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="PoliceStationEnquiey"
                                component={PoliceStationEnquiey}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="PoliceStationEnquieyresult"
                                component={PoliceStationEnquieyresult}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="PreviusEnquiry"
                                component={PreviusEnquiry}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Profile"
                                component={Profile}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="SignUp"
                                component={SignUp}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Splash"
                                component={Splash}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Welcome"
                                component={Welcome}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Feedback"
                                component={Feedback}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="EmpLoading"
                                component={EmpLoading}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="LegalLoading"
                                component={LegalLoading}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="FeedLoading"
                                component={FeedLoading}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="ForgetPassword"
                                component={ForgetPassword}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Subsciption_plan"
                                component={Subsciption_plan}
                                options={{ headerShown: false }}
                            />
                        </Stack.Navigator>
                    )}
                </NavigationContainer>
            )}
            <Toast ref={ref => Toast.setRef(ref)} />
        </>
    );
};
function mapStateToProps(state) {
    const { users } = state;
    return {
        users,
    };
}
export default connect(mapStateToProps)(Route);
