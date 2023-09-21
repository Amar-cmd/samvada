import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Appearance,
} from 'react-native';
import samvada_logo from '../assets/samvada-logo-black.png';
import welcome_messages from '../assets/welcome-messages.png';
import { ThemeContext } from '../context/ThemeContext';

const WelcomeScreen = ({ navigation }) => {
    const theme = useContext(ThemeContext);
  console.log('====================================');
  console.log(theme);
  console.log('====================================');
  
  const handleContinuePress = () => {
    navigation.navigate('Register')
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <Image source={theme.logo} style={styles.logo} resizeMode="contain" />
      <Image
        source={welcome_messages}
        style={styles.illustratorImage}
        resizeMode="contain"
      />
      <Text style={[styles.welcomeText, {color: theme.text}]}>Welcome</Text>
      <TouchableOpacity
        style={[styles.continueButton, {borderColor: theme.borderColor}]}
        onPress={handleContinuePress}>
        <Text style={[styles.continueText, {color: theme.buttonText}]}>
          Continue
        </Text>
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
    fontStyle: 'italic',
  },
  continueButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#6A5BC2',
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
  },
  continueText: {
    color: '#6A5BC2',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default WelcomeScreen;
