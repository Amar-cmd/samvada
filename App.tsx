import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SignedInStack, SignedOutStack} from './src/Navigation';

const App: React.FC = () => {
  const loggedInUser = false; // You can toggle this to test the behavior

  return (
    <NavigationContainer>
      {loggedInUser ? <SignedInStack /> : <SignedOutStack />}
    </NavigationContainer>
  );
};

export default App;
