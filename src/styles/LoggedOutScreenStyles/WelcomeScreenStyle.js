import {StyleSheet, Dimensions} from 'react-native';

const { height } = Dimensions.get('window');

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
    height: height * 0.2,
    marginBottom: 20,
  },
  illustratorImage: {
    width: '100%',
    height: height * 0.4,
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

export default styles