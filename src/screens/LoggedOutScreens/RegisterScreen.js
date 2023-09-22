import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {ThemeContext} from '../../context/ThemeContext';
import ToastContext from '../../context/ToastContext';

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
    letterSpacing: 1,
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
