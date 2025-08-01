import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MyDrawer from './MyDrawer';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';

const Drawer = createDrawerNavigator();

const Sidebar = () => {
  return (
   
      <Drawer.Navigator
        drawerContent={(props) => <MyDrawer {...props} />}
        initialRouteName="Home"
      >
        <Drawer.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Drawer.Screen name="Login" component={Login} options={{ headerShown: false }} />
        {/* Add more screens as needed */}
      </Drawer.Navigator>
  );
};

export default Sidebar;
