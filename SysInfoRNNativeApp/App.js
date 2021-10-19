import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeIcon from './assets/Icons/home.svg';
import SettingsIcon from './assets/Icons/settings.svg';
import GallaryIcon from './assets/Icons/collections_black.svg';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          tabBarIcon: ({ color, focused, size }) => {
            switch (route.name) {
              case 'Home':
                return <HomeIcon height={size} width={size} fill={color} />;
              case 'Gallary':
                return <GallaryIcon height={size} width={size} fill={color} />;
              case 'Settings':
                return <SettingsIcon height={size} width={size} fill={color} />;

              default:
                return null;
            }
          },
        };
      }}>
      <Tab.Screen
        name="Home"
        getComponent={() => require('./screens/Home').default}
      />
      <Tab.Screen
        name="Gallary"
        getComponent={() => require('./screens/Gallary').default}
      />
      <Tab.Screen
        name="Settings"
        getComponent={() => require('./screens/Settings').default}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const navigationRef = useNavigationContainerRef();

  const onReady = async () => {
    try {
      const res = await AsyncStorage.getItem('@user_info');
      if (res) {
        const user = JSON.parse(res);
        if (user.accessToken) {
          navigationRef.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        }
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <NavigationContainer ref={navigationRef} onReady={onReady}>
      <Stack.Navigator>
        <Stack.Group
          screenOptions={{
            headerTransparent: true,
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 24,
              color: 'red',
              fontWeight: '700',
            },
          }}>
          <Stack.Screen
            name="Login"
            getComponent={() => require('./screens/Login').default}
          />
          <Stack.Screen
            name="Register"
            getComponent={() => require('./screens/Register').default}
          />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={HomeTabNavigation} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
