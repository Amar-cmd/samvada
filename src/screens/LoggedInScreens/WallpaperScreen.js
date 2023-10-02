import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ThemeContext} from '../../context/ThemeContext';

const screenWidth = Dimensions.get('window').width;

const WallpaperScreen = ({navigation}) => {
  const theme = useContext(ThemeContext);
  const handleGoBack = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  };

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
          {/* Toolbar */}
          <View
            style={[
              styles.toolbar,
              {backgroundColor: theme.containerBackground},
            ]}>
            {/* Back Button */}
            <TouchableOpacity onPress={handleGoBack}>
              <Icon name="arrow-back" size={30} color="#7A7A7A" />
            </TouchableOpacity>

            {/* Title */}
            <Text style={[styles.toolbarTitle, {color: theme.text}]}>
              {theme.containerBackground === '#000'
                ? 'Dark Theme Wallpaper'
                : 'Light Theme Wallpaper'}
            </Text>

            {/* Placeholder for right alignment */}
            <View style={styles.toolbarPlaceholder} />
          </View>

          {/* Wallpaper */}
          <View style={styles.topSection}>
            <Image
              source={theme.wallpaperImage}
              style={styles.wallpaperImage}
              resizeMode="contain"
            />
            <TouchableOpacity style={styles.changeButton}>
              <Text style={styles.changeButtonText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  toolbarTitle: {
    fontSize: 18,
  },
  toolbarPlaceholder: {
    width: 30,
  },
  wallpaperContainer: {},
  wallpaperImage: {
    width: 0.7 * screenWidth, // 80% of screen width
    height: 1.4 * screenWidth, // 80% of screen width
    borderColor: '#7A7A7A', // Border color
    borderWidth: 2, // Border width
    borderRadius: 10,
  },
  topSection: {
    alignItems: 'center', // Horizontally center the content
    marginTop: 30, // Some spacing from the top
  },
  changeButton: {
    marginTop: 10, // Spacing from the image
    padding: 10, // Padding for the button
    borderRadius: 5, // Optional: rounded corners
    borderColor: '#7A7A7A',
    borderWidth: 1,
  },
  changeButtonText: {
    color: '#7A7A7A',
  },
  
});

export default WallpaperScreen;
