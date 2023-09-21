import React, {useState} from 'react';
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

const RegisterScreen = () => {
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
    return initials || 'N';
  };

  const handleCreatePress = async () => {
    console.log(
      'Create button pressed with phone number:',
      `${countryCode}${phoneNumber}`,
    );

    // Start phone number authentication
    try {
      const confirmation = await auth().signInWithPhoneNumber(
        `${countryCode}${phoneNumber}`,
      );
      // At this point, the OTP has been sent.
      // You'll need to prompt the user for the OTP and use the 'confirmation' object
      // to complete the authentication.
    } catch (error) {
      Alert.alert('Error sending OTP', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={samvada_logo} style={styles.image} resizeMode="contain" />
      <Text style={styles.heading}>Create Account</Text>
      <View style={styles.nameInputContainer}>
        <Text style={styles.nameInitial}>{getInitials(name)}</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          placeholderTextColor="#888"
          onChangeText={handleNameChange}
          value={name}
        />
      </View>

      <View style={styles.phoneInputContainer}>
        <Text style={styles.countryCode}>{countryCode}</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Phone Number"
          placeholderTextColor="#888"
          keyboardType="phone-pad"
          onChangeText={handlePhoneNumberChange}
          value={phoneNumber}
        />
      </View>

      <TouchableOpacity style={styles.customButton} onPress={handleCreatePress}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 150,
    marginBottom: 30,
    marginTop: 20,
  },
  heading: {
    color: '#000',
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
    fontSize: 16,
    marginRight: 10,
    padding: 10,
    color: '#000',
    borderWidth: 1,
    borderColor: '#6A5BC2',
  },
  nameInitial: {
    fontSize: 16,
    marginRight: 10,
    padding: 10,
    color: '#000',
    borderWidth: 1,
    borderColor: '#6A5BC2',
  },
  input: {
    width: '85%',
    height: 45,
    borderColor: 'gray',
    paddingLeft: 10,
    color: '#000',
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
