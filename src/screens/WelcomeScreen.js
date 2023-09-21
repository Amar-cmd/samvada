import React from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import samvada_logo from '../assets/samvada-logo-black.png';
import welcome_messages from '../assets/welcome-messages.png';



const WelcomeScreen = ({ navigation }) => {
  
  const handleContinuePress = () => {
    navigation.navigate('Register')
  };

  return (
    <View style={styles.container}>
      <Image source={samvada_logo} style={styles.logo} resizeMode="contain" />

      <Image
        source={welcome_messages}
        style={styles.illustratorImage}
        resizeMode="contain"
      />

      <Text style={styles.welcomeText}>Welcome</Text>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleContinuePress}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '60%',
    height: 150,
    marginBottom: 30,
  },
  illustratorImage: {
    width: '100%',
    height: 350,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6A5BC2',
    fontStyle:'italic',
  },
  continueButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#6A5BC2',
    borderRadius: 5, // Adding a slight roundness to the button
    marginTop: 20,
    width:'100%',
  },
  continueText: {
    color: '#6A5BC2',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
