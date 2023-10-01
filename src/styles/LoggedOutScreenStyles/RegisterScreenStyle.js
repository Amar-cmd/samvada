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
    textTransform:'capitalize'
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
  memberText: {
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
});

export default styles