import React, {useContext, useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ThemeContext} from '../../context/ThemeContext';
import database from '@react-native-firebase/database';
import styles from '../../styles/LoggedInScreenStyles/ChatDetailsScreenStyle';

const ChatDetailsScreen = ({navigation, route}) => {
  const theme = useContext(ThemeContext);
  const UID = route.params.UID;
  const receiverUID = route.params.receiverUID;
  const username = route.params.user;
  const userImage = route.params.userImage;

  console.log('==========================');
  console.log('sender UID = ', UID);
  console.log('receiver UID = ', receiverUID);

  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const formatTime = timestamp => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
  };

  // const handleSendMessage = () => {
  //   // Trim the message to remove any leading or trailing white spaces
  //   const trimmedMessage = message.trim();

  //   // Only proceed if the message is not an empty string
  //   if (trimmedMessage) {
  //     console.log(trimmedMessage, UID);

  //     // Implement logic to send the message to Firestore if needed
  //     // ...

  //     // Reset the input field to an empty string
  //     setMessage('');
  //   }
  // };

  // const handleSendMessage = () => {
  //   const trimmedMessage = message.trim();
  //   if (trimmedMessage) {
  //     // Define the path for the chat. For simplicity, I'm using user's UID as the chat ID.
  //     // In a more complex application, you might want to generate a unique ID for each conversation.
  //     const chatRef = database().ref(`conversations/${UID}/messages`);

  //     // Push the new message to the path.
  //     chatRef.push({
  //       text: trimmedMessage,
  //       timestamp: database.ServerValue.TIMESTAMP,
  //       sender: UID, // Replace this with the actual UID of the sender.
  //     });

  //     setMessage('');
  //   }
  // };

  const handleSendMessage = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      // Create a chat reference based on sender and receiver UIDs
      const chatID = [UID, receiverUID].sort().join('_');
      const chatRef = database().ref(`conversations/${chatID}/messages`);

      // Push the new message to the path.
      chatRef.push({
        text: trimmedMessage,
        timestamp: database.ServerValue.TIMESTAMP,
        sender: UID,
      });

      setMessage('');
    }
  };

  // useEffect(() => {
  //   const chatRef = database().ref(`conversations/${UID}/messages`);
  //   chatRef.on('value', snapshot => {
  //     const messages = [];
  //     snapshot.forEach(childSnapshot => {
  //       messages.push({
  //         id: childSnapshot.key,
  //         ...childSnapshot.val(),
  //       });
  //     });
  //     setChatMessages(messages);
  //   });

  //   return () => {
  //     chatRef.off();
  //   };
  // }, []);

  useEffect(() => {
    const chatID = [UID, receiverUID].sort().join('_');
    const chatRef = database().ref(`conversations/${chatID}/messages`);

    chatRef.on('value', snapshot => {
      const messages = [];
      snapshot.forEach(childSnapshot => {
        messages.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });
      setChatMessages(messages);
    });

    return () => {
      chatRef.off();
    };
  }, [UID, receiverUID]); // Add UID and receiverUID to the dependency array

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
        {/* Toolbar */}
        <View style={styles.toolbar}>
          {/* Back Button */}
          <Icon
            name="arrow-back"
            size={30}
            color="#7A7A7A"
            onPress={() => navigation.goBack()}
          />

          {/* Middle Section: Name & Online Status */}
          <View style={styles.middleSection}>
            <Text style={styles.name}>{username}</Text>
            <Text style={styles.onlineStatus}>Online</Text>
          </View>

          {/* Right Section: Profile Image */}
          <Image source={{uri: userImage}} style={styles.profileImage} />
        </View>

        {/* Rest of the screen */}
        <View style={[styles.content, {backgroundColor: theme.background}]}>
          {chatMessages.map(msg => (
            <View
              key={msg.id}
              style={
                msg.sender === UID
                  ? styles.senderMessageContainer
                  : styles.recipientMessageContainer
              }>
              <Text
                style={
                  msg.sender === UID
                    ? styles.senderMessage
                    : styles.recipientMessage
                }>
                {msg.text}
              </Text>
              <Text style={styles.messageTime}>
                {formatTime(msg.timestamp)}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <View
        style={[
          styles.inputContainer,
          {backgroundColor: theme.containerBackground},
        ]}>
        <TextInput
          style={styles.textInput}
          value={message}
          onChangeText={text => setMessage(text)}
          placeholder="Type a message..."
          placeholderTextColor="#6A5BC2"
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Icon name="send" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ChatDetailsScreen;
