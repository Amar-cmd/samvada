import React from 'react';
import {Text, View, Button, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

const HomeScreen = () => {
  const handleLogout = async () => {
    try {
      await auth().signOut();
      Alert.alert('Logged out', 'You have been logged out successfully.');
    } catch (error) {
      Alert.alert('Logout Error', error.message);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>HomeScreen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
