import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import AboutScreen from './src/screens/AboutScreen';
import PortfolioScreen from './src/screens/PortfolioScreen';
import ServicesScreen from './src/screens/ServicesScreen';
import ContactScreen from './src/screens/ContactScreen';

// Import components
import CustomTabBar from './src/components/CustomTabBar';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#0f0f23" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#0f0f23' },
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Portfolio" component={PortfolioScreen} />
        <Stack.Screen name="Services" component={ServicesScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
      </Stack.Navigator>
      <CustomTabBar />
    </NavigationContainer>
  );
}