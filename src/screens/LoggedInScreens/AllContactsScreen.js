import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from 'react';
import Contacts from 'react-native-contacts';
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  PermissionsAndroid,
  Modal,
  ScrollView,
  TextInput,
  SectionList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ThemeContext} from '../../context/ThemeContext';
import firestore from '@react-native-firebase/firestore';
import styles from '../../styles/LoggedInScreenStyles/AllContactsScreenStyle';

const AllContactsScreen = ({navigation}) => {
  const theme = useContext(ThemeContext);
  const [contactColors, setContactColors] = useState({});
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [isSearchVisible, setSearchVisibility] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [userPhoneNumbers, setUserPhoneNumbers] = useState([]);
  const [members, setMembers] = useState([]);
  const [nonMembers, setNonMembers] = useState([]);
  const [userImages, setUserImages] = useState({});

  //! If Build Does Not Work in Production app then look at its npm docs and proguard code file.

  //* to convert +91 12345 67890 to +911234567890
  const sanitizePhoneNumber = number => {
    let sanitizedNumber = number.replace(/[^0-9]/g, ''); // Removes all non-numeric characters

    // If the number starts with '0', remove the '0'
    if (sanitizedNumber.startsWith('0')) {
      sanitizedNumber = sanitizedNumber.substring(1);
    }

    // If the number doesn't start with '+91', prepend it
    if (!sanitizedNumber.startsWith('+91')) {
      sanitizedNumber = '+91' + sanitizedNumber;
    }

    return sanitizedNumber;
  };

  const openImageModal = useCallback(uri => {
    setSelectedImageUri(uri);
    setImageModalVisible(true);
  }, []);

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
  const sortContactsByName = (a, b) => {
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
  };

  const fetchContacts = useCallback(async () => {
    try {
      let contactsList = await Contacts.getAll();

      // Filter out any contacts that are null or don't have a phone number
      contactsList = contactsList.filter(
        contact => contact && contact.phoneNumbers && contact.phoneNumbers[0],
      );

      const membersList = [];
      const nonMembersList = [];

      contactsList.forEach(contact => {
        const sanitizedContactNumber = sanitizePhoneNumber(
          contact.phoneNumbers[0].number,
        );
        if (userPhoneNumbers.includes(sanitizedContactNumber)) {
          membersList.push(contact);
        } else {
          nonMembersList.push(contact);
        }
      });

      // Apply the sorting function
      membersList.sort(sortContactsByName);
      nonMembersList.sort(sortContactsByName);

      setMembers(membersList);
      setNonMembers(nonMembersList);

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

  // useEffect(() => {
  //   // Fetch all users from Firestore
  //   const unsubscribe = firestore()
  //     .collection('users')
  //     .onSnapshot(snapshot => {
  //       const phoneNumbers = []; // Array to store phone numbers of fetched users

  //       snapshot.forEach(doc => {
  //         const userData = {
  //           ...doc.data(),
  //           id: doc.id,
  //         };

  //         // If the user has a phoneNumber, add it to the phoneNumbers array
  //         if (userData.phoneNumber) {
  //           phoneNumbers.push(userData.phoneNumber);
  //         }
  //       });

  //       setUserPhoneNumbers(phoneNumbers); // Set the state variable with the collected phone numbers

  //       // Check if phoneNumbers is blank
  //       if (phoneNumbers.length === 0) {
  //         console.log('userPhoneNumbers is blank!');
  //       }
  //     });

  //   return () => unsubscribe();
  // }, []);

  // useEffect(() => {
  //   // Fetch all users from Firestore
  //   const unsubscribe = firestore()
  //     .collection('users')
  //     .onSnapshot(snapshot => {
  //       const phoneNumbers = []; // Array to store phone numbers of fetched users
  //       const userImages = {}; // Object to store user images with phone number as the key

  //       snapshot.forEach(doc => {
  //         const userData = {
  //           ...doc.data(),
  //           id: doc.id,
  //         };

  //         // If the user has a phoneNumber, add it to the phoneNumbers array
  //         if (userData.phoneNumber) {
  //           phoneNumbers.push(userData.phoneNumber);

  //           // If the user has a userImage, add it to the userImages object
  //           if (userData.userImage) {
  //             userImages[userData.phoneNumber] = userData.userImage;
  //           }
  //         }
  //       });

  //       setUserPhoneNumbers(phoneNumbers); // Set the state variable with the collected phone numbers

  //       // You can set the userImages to a state variable if needed
  //       // setUserImages(userImages);

  //       // Check if phoneNumbers is blank
  //       if (phoneNumbers.length === 0) {
  //         console.log('userPhoneNumbers is blank!');
  //       }
  //     });

  //   return () => unsubscribe();
  // }, []);

  useEffect(() => {
    // Fetch all users from Firestore
    const unsubscribe = firestore()
      .collection('users')
      .onSnapshot(snapshot => {
        const phoneNumbers = [];
        const fetchedUserImages = {};

        snapshot.forEach(doc => {
          const userData = {
            ...doc.data(),
            id: doc.id,
          };

          if (userData.phoneNumber) {
            phoneNumbers.push(userData.phoneNumber);

            // If the user has an image, store it in the fetchedUserImages object
            if (userData.userImage) {
              fetchedUserImages[userData.phoneNumber] = userData.userImage;
            }
          }
        });

        setUserPhoneNumbers(phoneNumbers);
        setUserImages(fetchedUserImages);
        console.log(userImages);

        if (phoneNumbers.length === 0) {
          console.log('userPhoneNumbers is blank!');
        }
      });

    return () => unsubscribe();
  }, []);

  // New useEffect to call fetchContacts when userPhoneNumbers changes
  useEffect(() => {
    if (userPhoneNumbers.length > 0) {
      fetchContacts();
    }
  }, [userPhoneNumbers]);

  const sectionedContacts = useMemo(() => {
    const filterContacts = contactList => {
      return contactList.filter(contact => {
        const name = `${contact.givenName} ${contact.familyName}`;
        return name.toLowerCase().includes(searchTerm.toLowerCase());
      });
    };

    return [
      {title: 'Members', data: filterContacts(members)},
      {title: 'Non-Members', data: filterContacts(nonMembers)},
    ];
  }, [members, nonMembers, searchTerm]);

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

        {/* <FlatList */}
        <SectionList
          // data={filteredContacts}
          sections={sectionedContacts}
          keyExtractor={item => item.recordID}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.sectionTitle}>{title}</Text>
          )}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          renderItem={({item}) => {
            const backgroundColor = contactColors[item.recordID];
            const name = `${item.givenName} ${item.familyName}`;
            // Extract the phone number from the item, then sanitize it
            const sanitizedPhoneNumber = sanitizePhoneNumber(
              item.phoneNumbers[0]?.number || '',
            );

            // Fetch the userImage from userImages using the sanitized phone number
            const userImage = userImages[sanitizedPhoneNumber];
            return (
              <View style={styles.profileContainer}>
                {item.thumbnailPath || userImage ? (
                  <TouchableOpacity
                    onPress={() =>
                      openImageModal(userImage ? userImage : item.thumbnailPath)
                    }>
                    <Image
                      source={{uri: userImage ? userImage : item.thumbnailPath}}
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


export default AllContactsScreen;
