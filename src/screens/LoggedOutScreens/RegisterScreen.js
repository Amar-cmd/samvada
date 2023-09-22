import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {ThemeContext} from '../../context/ThemeContext';
import ToastContext from '../../context/ToastContext';
import styles from '../../styles/LoggedOutScreenStyles/RegisterScreenStyle';

const RegisterScreen = ({navigation}) => {
  const theme = useContext(ThemeContext);
  const {showToast} = useContext(ToastContext);

  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const confirmation = await auth().signInWithPhoneNumber(
        `${countryCode}${phoneNumber}`,
      );
      showToast('OTP Sent. Please Confirm.');
      // navigation.navigate('Verification', {confirmation});
      navigation.navigate('Verification', {
        name: name,
        confirmation: confirmation,
      });

    } catch (error) {
      Alert.alert('Error sending OTP', error.message);
    }
    setLoading(false);
  };

  // Condition to check if the button should be disabled
  const isButtonDisabled = phoneNumber.length < 10 || !name;

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
            style={[styles.nameInitial, {backgroundColor: theme.borderColor}]}>
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
        {loading ? (
          <ActivityIndicator size="large" color="#6A5BC2" />
        ) : (
          <TouchableOpacity
            style={[
              styles.customButton,
              {borderColor: theme.borderColor},
              isButtonDisabled && {opacity: 0.3},
            ]}
            onPress={handleCreatePress}
            disabled={isButtonDisabled}>
            <Text style={[styles.buttonText, {color: theme.buttonText}]}>
              Continue
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default RegisterScreen;
