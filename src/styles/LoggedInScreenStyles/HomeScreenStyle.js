import { StyleSheet } from 'react-native'

const profileContainer = {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 10,
  borderRadius: 10,
  marginBottom: 10,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
  logo: {
    width: '30%',
    height: 50,
  },
  content: {
    width: '100%',
    height: '100%',
    marginTop: 30,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
  },
  allMessagesContainer: {
    padding: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  allMessagesHeader: {
    fontSize: 16,
    marginBottom: 20,
    color: '#7A7A7A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  profileContainer,

  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  messageInfo: {
    flex: 3,
  },
  profileName: {
    fontWeight: 'bold',
    color: '#7A7A7A',
  },
  recentMessage: {
    color: '#7A7A7A',
  },
  timeAndTick: {
    flex: 1,
    alignItems: 'flex-end',
  },
  time: {
    color: '#7A7A7A',
  },
  menuProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  menuProfileName: {
    fontSize: 24,
    marginBottom: 10,
    color: '#000',
  },
  menuProfilePhone: {
    fontSize: 18,
    marginBottom: 20,
    color: '#000',
  },
  editButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#7A7A7A',
  },

  fullScreenTouchable: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0006',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  menuContainer: {
    width: '100%', // or any desired width
    borderTopLeftRadius: 50, // rounded corners if you like
    alignItems: 'center',
    padding: 20,
  },
  closeButtonContainer: {
    flexDirection: 'row',
    // alignSelf: 'flex-end',
    width: '100%',
    justifyContent: 'space-between',
  },
  selectionToolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#f5f5f5',
  },
  selectedProfileContainer: {
    ...profileContainer,
    backgroundColor: '#6A5BC2',
  },
});

export default styles;