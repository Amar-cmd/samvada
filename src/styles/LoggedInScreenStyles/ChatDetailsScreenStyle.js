import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  toolbar: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  middleSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7A7A7A',
  },
  onlineStatus: {
    color: 'green',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
  content: {
    flex: 1,
    marginTop: 30,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    paddingVertical: 60,
    paddingHorizontal: 10,
    overflow: 'hidden',
  },
  recipientMessageContainer: {
    alignSelf: 'flex-start',
    // backgroundColor: '#EAEAEA',
    padding: 10,
    // borderRadius: 10,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: 10,
    maxWidth: '70%',
    borderColor: '#6A5BC2',
    borderWidth: 1,
  },
  senderMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#6A5BC2',
    padding: 10,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
    maxWidth: '70%',
  },
  recipientMessage: {
    color: '#6A5BC2',
  },
  senderMessage: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  textInput: {
    flex: 1,
    padding: 10,
    borderWidth: 0.5,
    borderColor: '#6A5BC2',
    borderRadius: 20,
    marginRight: 10,
    color: '#6A5BC2',
  },
  sendButton: {
    backgroundColor: '#6A5BC2',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageTime: {
    alignSelf: 'flex-end',
    fontSize: 10,
    color: '#b4ade0',
    marginTop: 5,
  },
});

export default styles;