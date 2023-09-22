import React, {useContext, useState, useEffect} from 'react';
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
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';
import {ThemeContext} from '../../context/ThemeContext';
import styles from '../../styles/LoggedInScreenStyles/HomeScreenStyle';

const HomeScreen = ({navigation}) => {
  const theme = useContext(ThemeContext);
  const [showMenu, setShowMenu] = useState(false);
  const [userData, setUserData] = useState(null);
  const [recentChats, setRecentChats] = useState([]);

  const handleLogout = async () => {
    try {
      await auth().signOut();
      Alert.alert('Logged out', 'You have been logged out successfully.');
    } catch (error) {
      Alert.alert('Logout Error', error.message);
    }
  };

  const fetchUserData = async uid => {
    try {
      const userDocument = await firestore().collection('users').doc(uid).get();
      if (userDocument.exists) {
        setUserData(userDocument.data());
      } else {
        console.log('No user data found!');
      }
    } catch (error) {
      console.error('Error fetching user data: ', error);
    }
  };

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      fetchUserData(currentUser.uid);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('conversations')
      .where('userIds', 'array-contains', auth().currentUser.uid)
      .onSnapshot(snapshot => {
        const chats = [];
        snapshot.forEach(doc => {
          chats.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setRecentChats(chats);
      });

    return () => unsubscribe();
  }, []);
  
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
                onPress={() =>
                  navigation.navigate('ChatDetails', {
                    UID: userData.UID,
                  })
                }
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
          <Button
            title="Logout"
            onPress={handleLogout}
            color={theme.buttonColor}
          />
        </View>
      </View>

      {showMenu && userData && (
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
              source={{uri: userData.userImage}}
              style={styles.menuProfileImage}
            />
            <Text style={[styles.menuProfileName, {color: theme.text}]}>
              {userData.username}
            </Text>
            <Text style={[styles.menuProfilePhone, {color: theme.text}]}>
              {userData.phoneNumber}
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

export default HomeScreen;
