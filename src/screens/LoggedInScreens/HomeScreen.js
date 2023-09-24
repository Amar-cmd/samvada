// import React, {useContext, useState, useEffect} from 'react';
// import {
//   Text,
//   View,
//   Button,
//   Alert,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   StatusBar,
// } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import Icon from 'react-native-vector-icons/Ionicons';
// import {ThemeContext} from '../../context/ThemeContext';
// import styles from '../../styles/LoggedInScreenStyles/HomeScreenStyle';

// const HomeScreen = ({navigation}) => {
//   const theme = useContext(ThemeContext);
//   const [showMenu, setShowMenu] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const [users, setUsers] = useState([]);

//   const senderUID = auth().currentUser.uid;

//   const handleLogout = async () => {
//     try {
//       await auth().signOut();
//       Alert.alert('Logged out', 'You have been logged out successfully.');
//     } catch (error) {
//       Alert.alert('Logout Error', error.message);
//     }
//   };

//   const fetchUserData = async uid => {
//     try {
//       const userDocument = await firestore().collection('users').doc(uid).get();
//       if (userDocument.exists) {
//         setUserData(userDocument.data());
//       } else {
//         console.log('No user data found!');
//       }
//     } catch (error) {
//       console.error('Error fetching user data: ', error);
//     }
//   };

//   useEffect(() => {
//     const currentUser = auth().currentUser;
//     if (currentUser) {
//       fetchUserData(currentUser.uid);
//     }
//   }, []);

//   useEffect(() => {
//     // Fetch all users from Firestore
//     const unsubscribe = firestore()
//       .collection('users')
//       .onSnapshot(snapshot => {
//         const fetchedUsers = [];
//         snapshot.forEach(doc => {
//           if (doc.id !== auth().currentUser.uid) {
//             // Exclude the current user
//             fetchedUsers.push({
//               ...doc.data(),
//               id: doc.id,
//             });
//           }
//         });
//         setUsers(fetchedUsers);
//       });

//     return () => unsubscribe();
//   }, []);

//   const handleEditPress = () => {
//     setShowMenu(false); // hide the profile menu
//     navigation.navigate('Profile', {
//       UID: senderUID,
//       userImage: userData.userImage,
//       name: userData.username,
//       phoneNumber: userData.phoneNumber,
//     });
//   };

//   return (
//     <>
//       <StatusBar
//         barStyle={
//           theme.containerBackground === '#000'
//             ? 'light-content'
//             : 'dark-content'
//         }
//         backgroundColor={theme.containerBackground}
//       />

//       <View
//         style={[
//           styles.container,
//           {backgroundColor: theme.containerBackground},
//         ]}>
//         <View style={styles.toolbar}>
//           <TouchableOpacity onPress={() => setShowMenu(true)}>
//             <Icon name="menu" size={30} color="#7A7A7A" />
//           </TouchableOpacity>

//           <Image source={theme.logo} style={styles.logo} resizeMode="contain" />

//           <TouchableOpacity onPress={() => {navigation.navigate("AllContacts")}}>
//             <Icon name="people" size={30} color="#7A7A7A" />
//           </TouchableOpacity>
//         </View>

//         <View style={[styles.content, {backgroundColor: theme.background}]}>
//           {/* //* Pinned Messages */}
//           <View></View>

//           {/* //* All Messages */}
//           <View style={styles.allMessagesContainer}>
//             <Text
//               style={[
//                 styles.allMessagesHeader,
//                 {backgroundColor: theme.containerBackground},
//               ]}>
//               All Messages
//             </Text>
//             <View style={styles.profileContainer}>
//               {/* <TouchableOpacity
//                 style={styles.profileContainer}
//                 onPress={() =>
//                   navigation.navigate('ChatDetails', {
//                     UID: userData.UID,
//                   })
//                 }
//                 activeOpacity={0.7}>
//                 <Image
//                   source={{
//                     uri: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
//                   }}
//                   style={styles.profileImage}
//                 />
//                 <View style={styles.messageInfo}>
//                   <Text style={styles.profileName}>John Doe</Text>
//                   <Text style={styles.recentMessage}>
//                     Hey there! How are you?
//                   </Text>
//                 </View>
//                 <View style={styles.timeAndTick}>
//                   <Text style={styles.time}>10:30 PM</Text>
//                   <Icon
//                     name="checkmark-done-outline"
//                     size={20}
//                     color="#7A7A7A"
//                   />
//                 </View>
//               </TouchableOpacity> */}
//               {users.map(user => (
//                 <TouchableOpacity
//                   key={user.id}
//                   style={styles.profileContainer}
//                   onPress={() =>
//                     navigation.navigate('ChatDetails', {
//                       UID: senderUID,
//                       receiverUID: user.UID,
//                       user: user.username,
//                       userImage: user.userImage,
//                     })
//                   }
//                   activeOpacity={0.7}>
//                   <Image
//                     source={{uri: user.userImage}}
//                     style={styles.profileImage}
//                   />
//                   <View style={styles.messageInfo}>
//                     <Text style={styles.profileName}>{user.username}</Text>
//                     {/* ... (you can display more user details here if needed) */}
//                   </View>
//                   {/* ... (rest of the profile container code) */}
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>
//         </View>
//       </View>

//       {showMenu && userData && (
//         <TouchableOpacity
//           style={styles.fullScreenTouchable}
//           onPress={() => setShowMenu(false)}
//           activeOpacity={1} // to maintain the view opacity when pressed
//         >
//           <View
//             style={[styles.menuContainer, {backgroundColor: theme.background}]}
//             onStartShouldSetResponder={() => true} // To prevent touch events from reaching the outer TouchableOpacity
//           >
//             <View style={styles.closeButtonContainer}>
//               <TouchableOpacity onPress={handleLogout}>
//                 <Icon name="power" size={30} color="red" />
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => setShowMenu(false)}>
//                 <Icon name="close" size={30} color="#7A7A7A" />
//               </TouchableOpacity>
//             </View>
//             <Image
//               source={{uri: userData.userImage}}
//               style={styles.menuProfileImage}
//             />
//             <Text style={[styles.menuProfileName, {color: theme.text}]}>
//               {userData.username}
//             </Text>
//             <Text style={[styles.menuProfilePhone, {color: theme.text}]}>
//               {userData.phoneNumber}
//             </Text>
//             <TouchableOpacity
//               style={styles.editButton}
//               onPress={handleEditPress}>
//               <Text style={[{color: theme.text}]}>Edit Profile</Text>
//             </TouchableOpacity>
//           </View>
//         </TouchableOpacity>
//       )}
//     </>
//   );
// };

// export default HomeScreen;

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
import Icon from 'react-native-vector-icons/Ionicons';
import {ThemeContext} from '../../context/ThemeContext';
import styles from '../../styles/LoggedInScreenStyles/HomeScreenStyle';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';

const HomeScreen = ({navigation}) => {
  const theme = useContext(ThemeContext);
  const [showMenu, setShowMenu] = useState(false);
  const [userData, setUserData] = useState(null);
  const [recentChats, setRecentChats] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const senderUID = auth().currentUser.uid;

  const handleUserSelect = userUID => {
    if (selectedUsers.includes(userUID)) {
      setSelectedUsers(prevSelectedUsers =>
        prevSelectedUsers.filter(uid => uid !== userUID),
      );
    } else {
      setSelectedUsers(prevSelectedUsers => [...prevSelectedUsers, userUID]);
    }
  };

  const handleDeleteSelected = () => {
    // Prompt the user for confirmation using an Alert
    Alert.alert(
      'Delete Messages',
      `Are you sure you want to delete ${selectedUsers.length} messages?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            // Delete each selected chat from the Realtime Database
            const conversationsRef = database().ref('conversations');

            for (let userUID of selectedUsers) {
              // Assuming the chat identifier is constructed as "senderUID_userUID"
              // You may need to modify this based on your data structure
              let chatId = `${senderUID}_${userUID}`;
              if (chatId > userUID) {
                chatId = `${userUID}_${senderUID}`;
              }

              // Delete the chat from the Realtime Database
              try {
                await conversationsRef.child(chatId).remove();
              } catch (error) {
                console.error(
                  `Failed to delete chat for UID ${userUID}:`,
                  error,
                );
              }
            }

            // Reset the selection state
            setIsSelectionMode(false);
            setSelectedUsers([]);
          },
        },
      ],
    );
  };


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

  const handleEditPress = () => {
    setShowMenu(false); // hide the profile menu
    navigation.navigate('Profile', {
      UID: senderUID,
      userImage: userData.userImage,
      name: userData.username,
      phoneNumber: userData.phoneNumber,
    });
  };

  useEffect(() => {
    // Fetch recent chats from Firebase Realtime Database
    const conversationsRef = database().ref('conversations');
    const handleDataChange = snapshot => {
      const conversationsData = snapshot.val();
      const recentChatUsers = [];

      // Iterate over the conversations data to find recent chats for the current user
      for (let chatId in conversationsData) {
        if (chatId.includes(senderUID)) {
          const ids = chatId.split('_');
          const otherUserId = ids[0] === senderUID ? ids[1] : ids[0];
          recentChatUsers.push(otherUserId);
        }
      }

      // Fetch user metadata for these UIDs from Firestore
      const fetchUserMetadata = async () => {
        const fetchedUsers = [];
        for (let uid of recentChatUsers) {
          const userDoc = await firestore().collection('users').doc(uid).get();
          if (userDoc.exists) {
            fetchedUsers.push(userDoc.data());
          }
        }
        setRecentChats(fetchedUsers);
      };
      console.log(recentChats);
      fetchUserMetadata();
    };

    conversationsRef.on('value', handleDataChange);

    return () => {
      conversationsRef.off('value', handleDataChange);
    };
  }, [senderUID]);

  useEffect(() => {
    if (isSelectionMode && selectedUsers.length === 0) {
      setIsSelectionMode(false);
    }
  }, [selectedUsers]);

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

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AllContacts');
            }}>
            <Icon name="people" size={30} color="#7A7A7A" />
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
            {/* {recentChats.map(user => (
              <TouchableOpacity
                key={user.UID}
                style={styles.profileContainer}
                onLongPress={() => {
                  if (!isSelectionMode) {
                    setIsSelectionMode(true);
                  }
                  handleUserSelect(user.UID);
                }}
                onPress={() => {
                  if (isSelectionMode) {
                    handleUserSelect(user.UID);
                  } else {
                    navigation.navigate('ChatDetails', {
                      UID: senderUID,
                      receiverUID: user.UID,
                      user: user.username,
                      userImage: user.userImage,
                    });
                  }
                }}
                activeOpacity={0.7}>
                <Image
                  source={{uri: user.userImage}}
                  style={styles.profileImage}
                />
                <View style={styles.messageInfo}>
                  <Text style={styles.profileName}>
                    {senderUID === user.UID
                      ? `${user.username} (You)`
                      : user.username}
                  </Text>
                </View>
              </TouchableOpacity>
            ))} */}

            {recentChats.map(user => (
              <TouchableOpacity
                key={user.UID}
                style={
                  selectedUsers.includes(user.UID)
                    ? styles.selectedProfileContainer
                    : styles.profileContainer
                }
                onLongPress={() => {
                  if (!isSelectionMode) {
                    setIsSelectionMode(true);
                  }
                  handleUserSelect(user.UID);
                }}
                onPress={() => {
                  if (isSelectionMode) {
                    handleUserSelect(user.UID);
                  } else {
                    navigation.navigate('ChatDetails', {
                      UID: senderUID,
                      receiverUID: user.UID,
                      user: user.username,
                      userImage: user.userImage,
                    });
                  }
                }}
                activeOpacity={0.7}>
                <Image
                  source={{uri: user.userImage}}
                  style={styles.profileImage}
                />
                <View style={styles.messageInfo}>
                  <Text style={styles.profileName}>
                    {senderUID === user.UID
                      ? `${user.username} (You)`
                      : user.username}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
              <TouchableOpacity onPress={handleLogout}>
                <Icon name="power" size={30} color="red" />
              </TouchableOpacity>
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
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditPress}>
              <Text style={[{color: theme.text}]}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
      {isSelectionMode && (
        <View
          style={[
            styles.selectionToolbar,
            {backgroundColor: theme.containerBackground},
          ]}>
          <Text>{selectedUsers.length} selected</Text>
          <TouchableOpacity
            onPress={() => {
              // handle delete action here
              setIsSelectionMode(false);
              setSelectedUsers([]);
            }}>
            <TouchableOpacity onPress={handleDeleteSelected}>
              <Icon name="trash-outline" size={30} color="#7A7A7A" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default HomeScreen;
