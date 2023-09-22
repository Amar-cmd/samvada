import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import {ThemeContext} from '../../context/ThemeContext';

const HomeScreen = ({navigation}) => {
  const theme = useContext(ThemeContext);
    const [showMenu, setShowMenu] = useState(false);

    const handleMenuToggle = () => {
      setShowMenu(!showMenu);
  };
  
  const handleLogout = async () => {
    try {
      await auth().signOut();
      Alert.alert('Logged out', 'You have been logged out successfully.');
    } catch (error) {
      Alert.alert('Logout Error', error.message);
    }
  };

  console.log(theme);
  return (
    <>
      <StatusBar
        barStyle={
          theme.containerBackground === '#000'
            ? 'light-content'
            : 'dark-content'
        }
        backgroundColor={theme.containerBackground}
      />

      <View
        style={[
          styles.container,
          {backgroundColor: theme.containerBackground},
        ]}>
        <View style={styles.toolbar}>
          <TouchableOpacity onPress={() => setShowMenu(true)}>
            <Icon name="menu" size={30} color="#7A7A7A" />
          </TouchableOpacity>

          <Image source={theme.logo} style={styles.logo} resizeMode="contain" />

          <TouchableOpacity onPress={() => {}}>
            <Icon name="moon" size={30} color="#0000" />
          </TouchableOpacity>
        </View>

        <View style={[styles.content, {backgroundColor: theme.background}]}>
          {/* //* Pinned Messages */}
          <View></View>

          {/* //* All Messages */}
          <View style={styles.allMessagesContainer}>
            <Text
              style={[
                styles.allMessagesHeader,
                {backgroundColor: theme.containerBackground},
              ]}>
              All Messages
            </Text>
            {/* Example Profile Container */}
            <View style={styles.profileContainer}>
              {/* Profile Image */}
              <TouchableOpacity
                style={styles.profileContainer}
                onPress={() => navigation.navigate('ChatDetails')}
                activeOpacity={0.7}>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
                  }}
                  style={styles.profileImage}
                />
                {/* Message Info */}
                <View style={styles.messageInfo}>
                  <Text style={styles.profileName}>John Doe</Text>
                  <Text style={styles.recentMessage}>
                    Hey there! How are you?
                  </Text>
                </View>
                {/* Time and Tick */}
                <View style={styles.timeAndTick}>
                  <Text style={styles.time}>10:30 PM</Text>
                  <Icon
                    name="checkmark-done-outline"
                    size={20}
                    color="#7A7A7A"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* <Button
            title="Logout"
            onPress={handleLogout}
            color={theme.buttonColor}
          /> */}
        </View>
      </View>

      {showMenu && (
        <TouchableOpacity
          style={styles.fullScreenTouchable}
          onPress={() => setShowMenu(false)}
          activeOpacity={1} // to maintain the view opacity when pressed
        >
          <View
            style={[styles.menuContainer, {backgroundColor: theme.background}]}
            onStartShouldSetResponder={() => true} // To prevent touch events from reaching the outer TouchableOpacity
          >
            <View style={styles.closeButtonContainer}>
              <TouchableOpacity onPress={() => setShowMenu(false)}>
                <Icon name="close" size={30} color="#7A7A7A" />
              </TouchableOpacity>
            </View>
            <Image
              source={{uri: 'https://randomuser.me/api/portraits/men/32.jpg'}}
              style={styles.menuProfileImage}
            />
            <Text style={[styles.menuProfileName, {color: theme.text}]}>
              John Doe
            </Text>
            <Text style={[styles.menuProfilePhone, {color: theme.text}]}>
              +1234567890
            </Text>
            <TouchableOpacity style={styles.editButton}>
              <Text style={[{color: theme.text}]}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
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
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    // backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
  },
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
    alignSelf: 'flex-end',
  },
});

export default HomeScreen;
