import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SignedInStack, SignedOutStack} from './src/Navigation';
import {ThemeProvider} from './src/context/ThemeContext';

const App: React.FC = () => {
  const loggedInUser = false; // You can toggle this to test the behavior

  return (
    <ThemeProvider>
      <NavigationContainer>
        {loggedInUser ? <SignedInStack /> : <SignedOutStack />}
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
