import React, {useState, useEffect, useContext, useCallback, useMemo} from 'react';
import Contacts from 'react-native-contacts';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  PermissionsAndroid,
  Alert,
  FlatList,
  Modal,
  ScrollView,
  Dimensions,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ThemeContext} from '../../context/ThemeContext';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const AllContactsScreen = ({navigation}) => {
  const theme = useContext(ThemeContext);
  const [contactColors, setContactColors] = useState({});
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [isSearchVisible, setSearchVisibility] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  //! If Build Does Not Work in Production app then look at its npm docs and proguard code file.

 const openImageModal = useCallback(uri => {
   setSelectedImageUri(uri);
   setImageModalVisible(true);
 }, []);

 const filteredContacts = useMemo(() => {
   return contacts.filter(contact => {
     const name = `${contact.givenName} ${contact.familyName}`;
     return name.toLowerCase().includes(searchTerm.toLowerCase());
   });
 }, [contacts, searchTerm]);

  const HighlightedText = React.memo(({text, highlight}) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <Text style={[styles.profileName, {color: theme.text}]}>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <Text key={index} style={styles.highlighted}>
              {part}
            </Text>
          ) : (
            part
          ),
        )}
      </Text>
    );
  });

  const requestContactsPermission = useCallback(async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts Permission',
          message: 'This app would like to view your contacts.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        fetchContacts();
      } else {
        console.warn('Contacts permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  });

  const fetchContacts = useCallback(async () => {
    try {
      const contactsList = await Contacts.getAll();

      // Generate colors for each contact
      const newContactColors = {};
      contactsList.forEach(contact => {
        newContactColors[contact.recordID] = generateRandomDarkColor();
      });
      setContactColors(newContactColors);

      // Sorting logic
      const sortedContacts = contactsList.sort((a, b) => {
        // Handle potential null or undefined values for names
        const nameA = (a.givenName || '').toUpperCase();
        const nameB = (b.givenName || '').toUpperCase();

        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;

        // If given names are the same, compare by family name
        const familyNameA = (a.familyName || '').toUpperCase();
        const familyNameB = (b.familyName || '').toUpperCase();

        if (familyNameA < familyNameB) return -1;
        if (familyNameA > familyNameB) return 1;

        return 0;
      });

      setContacts(sortedContacts);
    } catch (err) {
      console.warn('Error fetching contacts', err);
    }
  });

  const generateRandomDarkColor = () => {
    const red = Math.floor(Math.random() * 128); // Values between 0 and 127
    const green = Math.floor(Math.random() * 128);
    const blue = Math.floor(Math.random() * 128);
    return `rgb(${red},${green},${blue})`;
  };

  useEffect(() => {
    requestContactsPermission();
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
      <View style={[styles.container, {backgroundColor: theme.background}]}>
        <View
          style={[
            styles.toolbar,
            {backgroundColor: theme.containerBackground},
          ]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={30} color="#7A7A7A" />
          </TouchableOpacity>
          {isSearchVisible ? (
            <TextInput
              value={searchTerm}
              onChangeText={setSearchTerm}
              style={styles.searchInput}
              placeholder="Search..."
              autoFocus={true}
            />
          ) : (
            <Text style={styles.title}>All Contacts</Text>
          )}
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={fetchContacts}>
            <Icon name="refresh" size={30} color="#7A7A7A" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              if (isSearchVisible) {
                setSearchTerm(''); // Clear the searchTerm when deactivating the search mode
              }
              setSearchVisibility(!isSearchVisible);
            }}>
            <Icon
              name={isSearchVisible ? 'close' : 'search'}
              size={30}
              color="#7A7A7A"
            />
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredContacts}
          keyExtractor={item => item.recordID}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          renderItem={({item}) => {
            const backgroundColor = contactColors[item.recordID];
            const name = `${item.givenName} ${item.familyName}`;
            return (
              <View style={styles.profileContainer}>
                {item.thumbnailPath ? (
                  <TouchableOpacity
                    onPress={() => openImageModal(item.thumbnailPath)}>
                    <Image
                      source={{uri: item.thumbnailPath}}
                      style={styles.profileImage}
                    />
                  </TouchableOpacity>
                ) : (
                  <View style={[styles.initialsContainer, {backgroundColor}]}>
                    <Text style={styles.initialsText}>
                      {item.givenName ? item.givenName.charAt(0) : ''}
                      {item.familyName ? item.familyName.charAt(0) : ''}
                    </Text>
                  </View>
                )}

                <HighlightedText text={name} highlight={searchTerm} />

                {/* <Text style={[styles.profilePhone, {color: theme.text}]}>
                  {item.phoneNumbers && item.phoneNumbers[0]
                    ? item.phoneNumbers[0].number
                    : 'N/A'}
                </Text> */}
                <View style={styles.border}></View>
              </View>
            );
          }}
        />
      </View>
      <Modal
        visible={isImageModalVisible}
        transparent={true}
        onRequestClose={() => setImageModalVisible(false)}>
        <View style={styles.modalContainer}>
          <ScrollView
            style={styles.imageScrollView}
            contentContainerStyle={styles.imageScrollViewContent}
            maximumZoomScale={3}
            minimumZoomScale={1}
            centerContent={true}>
            <Image
              source={{uri: selectedImageUri}}
              style={styles.enlargedImage}
            />
          </ScrollView>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setImageModalVisible(false)}>
            {/* <Text style={styles.closeButtonText}>Close</Text> */}
            <Icon name="close" size={30} color="#7A7A7A" />
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },

  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 18,
    color: '#7A7A7A',
  },
  searchButton: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    marginRight: 10,
  },
  highlighted: {
    color: '#6A5BC2', // Yellow color for the highlighted text
  },
  refreshButton: {
    marginLeft: 'auto',
    marginRight: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileName: {
    fontSize: 16,
    color: '#7A7A7A',
  },
  border: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '80%',
    height: 0.5,
    opacity: 0.3,
    backgroundColor: '#7A7A7A',
  },
  initialsContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#7A7A7A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  initialsText: {
    fontSize: 20,
    color: '#FFF',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageScrollView: {
    width: '100%',
    height: '100%',
  },
  imageScrollViewContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  enlargedImage: {
    width: screenWidth,
    height: screenHeight,
    resizeMode: 'contain',
  },

  closeButton: {
    position: 'absolute',
    top: 50,
    right: 10,
    borderRadius: 10,
    padding: 5,
  },
  closeButtonText: {
    fontSize: 16,
  },
});

export default AllContactsScreen;
