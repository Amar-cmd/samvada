import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SignedInStack, SignedOutStack} from './src/Navigation';
import {ThemeProvider} from './src/context/ThemeContext';
import auth from '@react-native-firebase/auth';

const App: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<boolean | null>(null);

  // const loggedInUser = false; // You can toggle this to test the behavior
  useEffect(() => {
    // Set an authentication state listener
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        setLoggedInUser(true);
      } else {
        setLoggedInUser(false);
      }
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  // If the loggedInUser state hasn't been set yet (i.e., it's still null),
  // you might want to return null or a loading spinner.
  if (loggedInUser === null) return null;


  return (
    <ThemeProvider>
      <NavigationContainer>
        {loggedInUser ? <SignedInStack /> : <SignedOutStack />}
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
