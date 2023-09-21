import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import samvada_logo from '../assets/samvada-logo-black.png';
import { ThemeContext } from '../context/ThemeContext';

const RegisterScreen = ({ navigation }) => {
  
    const theme = useContext(ThemeContext);

  
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');

  const handlePhoneNumberChange = text => {
    setPhoneNumber(text);
  };

  const handleNameChange = text => {
    setName(text);
  };

  const getInitials = name => {
    const parts = name.split(' ').filter(part => part !== '');
    const firstNameInitial = parts[0] ? parts[0][0] : '';
    const lastNameInitial = parts[1] ? parts[1][0] : '';
    const initials = `${firstNameInitial}${lastNameInitial}`.toUpperCase();
    return initials || '';
  };

  const handleCreatePress = async () => {
    console.log(
      'Create button pressed with phone number:',
      `${countryCode}${phoneNumber}`,
      );
      navigation.navigate('Verification');  

    // Start phone number authentication
    // try {
    //   const confirmation = await auth().signInWithPhoneNumber(
    //     `${countryCode}${phoneNumber}`,
    //   );
    //   // At this point, the OTP has been sent.
    //   // You'll need to prompt the user for the OTP and use the 'confirmation' object
    //   // to complete the authentication.
    // } catch (error) {
    //   Alert.alert('Error sending OTP', error.message);
    // }
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.topSection}>
        <Image source={theme.logo} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.inputSection}>
        <Text style={[styles.heading, {color: theme.text}]}>
          Create Account
        </Text>
        <View style={styles.nameInputContainer}>
          <Text
            style={[
              styles.nameInitial,
              {backgroundColor: theme.borderColor},
            ]}>
            {getInitials(name)}
          </Text>
          <TextInput
            style={[styles.input, {color: theme.text}]}
            placeholder="Enter Name"
            placeholderTextColor="#888"
            onChangeText={handleNameChange}
            value={name}
          />
        </View>

        <View style={styles.phoneInputContainer}>
          <Text style={[styles.countryCode, {color: theme.text}]}>
            {countryCode}
          </Text>
          <TextInput
            style={[styles.input, {color: theme.text}]}
            placeholder="Enter Phone Number"
            placeholderTextColor="#888"
            keyboardType="phone-pad"
            onChangeText={handlePhoneNumberChange}
            value={phoneNumber}
          />
        </View>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={[styles.customButton, {borderColor: theme.borderColor}]}
          onPress={handleCreatePress}>
          <Text style={[styles.buttonText, {color: theme.buttonText}]}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'space-between',
  },
  topSection: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputSection: {
    flex: 2,
    justifyContent: 'center',
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  image: {
    width: '60%',
    height: 150,
    marginBottom: 30,
    alignSelf: 'center',
  },
  heading: {
    color: '#6A5BC2',
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30,
    fontStyle: 'italic',
    fontWeight: 'bold',
    letterSpacing:1,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  nameInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  countryCode: {
    flex: 1, // 10% width
    fontSize: 16,
    marginRight: 10,
    padding: 10,
    color: '#000',
    borderWidth: 1,
    borderColor: '#6A5BC2',
    textAlign: 'center',
  },
  nameInitial: {
    flex: 1, // 10% width
    fontSize: 16,
    marginRight: 10,
    padding: 10,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#6A5BC2',
    textAlign: 'center',
  },
  input: {
    flex: 9, // 90% width
    height: 45,
    paddingLeft: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#6A5BC2',
  },
  customButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#6A5BC2',
  },
  buttonText: {
    color: '#6A5BC2',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
