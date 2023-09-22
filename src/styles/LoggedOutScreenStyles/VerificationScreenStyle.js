import { StyleSheet } from "react-native";

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

export default styles