import React, {useContext} from 'react';
import {Text, View, Image, StyleSheet, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ThemeContext} from '../../context/ThemeContext';

const ChatDetailsScreen = ({navigation}) => {
  const theme = useContext(ThemeContext);

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
              <Text style={styles.name}>John Doe</Text>
              <Text style={styles.onlineStatus}>Online</Text>
            </View>

            {/* Right Section: Profile Image */}
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
              }}
              style={styles.profileImage}
            />
          </View>

          {/* Rest of the screen */}
          <View style={[styles.content, {backgroundColor: theme.background}]}>
            {/* Recipient Message */}
            <View
              style={[
                styles.recipientMessageContainer,
                {backgroundColor: theme.containerBackground},
              ]}>
              <Text style={styles.recipientMessage}>Hey! How are you?</Text>
            </View>

            {/* Sender Message */}
            <View style={styles.senderMessageContainer}>
              <Text style={styles.senderMessage}>
                I'm good! Thanks for asking.
              </Text>
            </View>
          </View>
        </View>
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
});

export default ChatDetailsScreen;
