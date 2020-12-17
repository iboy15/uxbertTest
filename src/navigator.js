import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import HomeScreen from './containers/HomeScreen';
import SearchScreen from './containers/SearchScreen';
import SplashScreen from './containers/SplashScreen';
import DetailsScreen from './containers/DetailScreen';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

const Stack = createSharedElementStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator
    initialRouteName={'SplashScreen'}
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name="SplashScreen"
      component={SplashScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Search"
      component={SearchScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Details"
      component={DetailsScreen}
      options={(navigation) => ({
        headerBackTitleVisible: false,
        cardStyleInterpolator: ({current: {progress}}) => {
          return {
            cardStyle: {
              opacity: progress,
            },
          };
        },
      })}
      sharedElementsConfig={(route) => {
        const {movie} = route.params;
        return [
          {
            id: `item.${movie.imdbID}.photo`,
            animation: 'move',
            resize: 'clip',
            align: 'center-top',
          },
          {
            id: `item.${movie.imdbID}.text`,
            animation: 'fade',
            resize: 'clip',
            align: 'center-center',
          },
        ];
      }}
    />
  </Stack.Navigator>
);

function AppNavigator(props) {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
export default AppNavigator;
