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
import {ThemeContext} from '../context/ThemeContext';

const VerificationScreen = ({route, navigation}) => {
  const theme = useContext(ThemeContext);
  const {confirmation} = route.params;

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOtpChange = text => {
    if (text.length <= 6) {
      setOtp(text);
    }
  };

  const handleConfirmPress = async () => {
    setLoading(true);

    try {
      const result = await confirmation.confirm(otp);
      if (result.user) {
        // OTP is correct and user is logged in
        // navigation.navigate('Home');
      }
    } catch (error) {
      Alert.alert(
        'Invalid OTP',
        'The entered OTP is incorrect. Please try again.',
      );
    }
    setLoading(false);
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.topSection}>
        <Image source={theme.logo} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.inputSection}>
        <Text style={[styles.heading, {color: theme.text}]}>Confirmation</Text>
        <Text style={[styles.instruction, {color: theme.text}]}>
          Please Enter The OTP
        </Text>

        <View style={styles.otpBoxesContainer}>
          {Array(6)
            .fill('')
            .map((_, idx) => (
              <View
                key={idx}
                style={[styles.otpBox, otp[idx] && styles.otpBoxFilled]}>
                <Text style={styles.otpText}>{otp[idx]}</Text>
              </View>
            ))}
          <TextInput
            value={otp}
            onChangeText={handleOtpChange}
            style={styles.hiddenInput}
            keyboardType="numeric"
            maxLength={6}
            autoFocus
            caretHidden={true}
          />
        </View>
      </View>

      <View style={styles.bottomSection}>
        {loading ? (
          <ActivityIndicator size="large" color="#6A5BC2" />
        ) : (
          <TouchableOpacity
            style={[styles.confirmButton, otp.length !== 6 && {opacity: 0.3}]}
            onPress={handleConfirmPress}
            disabled={otp.length !== 6}>
            <Text style={styles.confirmButtonText}>Confirm</Text>
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
    alignItems: 'center', // This centers all child components horizontally.
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
  instruction: {
    color: '#6A5BC2',
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 30,
  },

  confirmButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#6A5BC2',
  },
  confirmButtonText: {
    color: '#6A5BC2',
    fontSize: 18,
    fontWeight: 'bold',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  otpInput: {
    flex: 1,
    height: 50, // Increased height
    lineHeight: 50, // Added lineHeight
    borderColor: '#6A5BC2',
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 24,
    marginHorizontal: 5,
  },

  otpBoxesContainer: {
    flexDirection: 'row',
    position: 'relative',
  },
  otpBox: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6A5BC2',
    marginHorizontal: 5,
  },
  otpBoxFilled: {
    backgroundColor: '#CAC3F1',
  },
  otpText: {
    fontSize: 20,
  },
  hiddenInput: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
  },
});

export default VerificationScreen;
