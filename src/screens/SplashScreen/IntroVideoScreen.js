// Import React and Component
import React, {useState, useEffect} from 'react'; 
import {TouchableOpacity, View, StyleSheet, Image,Text,Alert,Linking} from 'react-native';
import Video from 'react-native-video';

import AsyncStorage from '@react-native-async-storage/async-storage';

const IntroVideoScreen = ({navigation}) => {

  const [userLocation, setUserLocation] = useState();
 const showVideo = () => {
   Alert.alert("img");
   findCoordinates();
 }
 const learnMore = () => {
    navigation.replace('DrawerNavigationRoutes');
 }
 const skipAd = () =>{
  navigation.replace('DrawerNavigationRoutes');
 }
 const findCoordinates = () => {
  navigator.geolocation.getCurrentPosition(
    position => {
      const location = JSON.stringify(position);

      setUserLocation({ location });
    },
    error => Alert.alert(error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );
};
const videoError = () => {

}
const onBuffer = () => {

}
  return (
    <View style={styles.container}>
      <Video source={{uri: "https://bluebookblacknews.com/bluebook/admin/images/intro/TikTok_video%20_DA0FC13_.mp4"}}   // Can be a URL or a local file.
       ref={(ref) => {
         this.player = ref
       }}                                      // Store reference
       onBuffer={onBuffer}                // Callback when remote video is buffering
       onError={videoError}               // Callback when video cannot be loaded 
       resizeMode={"cover"}
       style={styles.backgroundImage} />
      
      <View style={ styles.learnMore }>
        <TouchableOpacity onPress={() => learnMore()}>
          <Text style={styles.skipIntroText}>SKIP Video</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IntroVideoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
  backgroundImageTouch: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: "stretch",
  },
  learnMore: {
    position: 'absolute',
      top: '80%',
      bottom: 0,
      left: '38%',
      right: '35%', 
  },
  skipIntro: {
      position: 'absolute',
      top: 80,
      bottom: 0,
      left: '75%',
      right: 20, 
  },
  skipIntroText: {
    backgroundColor: '#07aaf5',
    color: 'white',
    padding: 10,
    fontSize:15,
  },
});
