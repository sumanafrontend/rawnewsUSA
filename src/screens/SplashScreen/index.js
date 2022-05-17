// Import React and Component
import React, {useState, useEffect} from 'react'; 
import {TouchableOpacity, View, StyleSheet, Image,Text,Alert,Linking, Platform, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreenRoot from  "react-native-splash-screen";


const SplashScreen = ({navigation}) => {

  const [userLocation, setUserLocation] = useState();
  useEffect(() => {
    getUserLocation();
    SplashScreenRoot.hide();
  }, [userLocation]);

  const hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
     // Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
        '',
        [
          { text: 'Go to Settings', onPress: openSetting },
          { text: "Don't Use Location", onPress: () => {} },
        ],
      );
    }

    return false;
  };
  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };
  const getUserLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }
    if (hasPermission) {
      Geolocation.getCurrentPosition(
          (position) => {
           // console.log(position.coords.latitude);
            //console.log(position.coords.longitude);
            AsyncStorage.setItem('user_latitude', JSON.stringify(position.coords.latitude));
            AsyncStorage.setItem('user_longitude', JSON.stringify(position.coords.longitude));
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  }
 const showVideo = () => {
   //Alert.alert("img");
   //findCoordinates();
   navigation.replace('IntroVideoScreen');
 }
 const learnMore = () => {
   let learnmoreLink = "http://raise-my-credit-score.com/free-credit-score-tik-tok/";
  Linking.openURL(learnmoreLink);
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
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backgroundImageTouch} onPress={() => showVideo()}>
      <Image
        source={{uri:'https://bluebookblacknews.com/bluebook/admin/images/intro/videoImage/blue-intro-thumb-60dcacd7dd25c.png'}}
        style={styles.backgroundImage}
      />
      </TouchableOpacity>
      <View style={ styles.skipIntro }>
        <TouchableOpacity onPress={() => skipAd()}>
            <Text style={styles.skipIntroText}>SKIP Ad</Text>
          </TouchableOpacity>
      </View>
      
      <View style={ styles.learnMore }>
        <TouchableOpacity onPress={() => learnMore()}>
          <Text style={styles.skipIntroText}>Learn More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SplashScreen;

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
    flex: 1,
    width: "100%",

    resizeMode: 'cover', // or 'stretch'
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
      top: 20,
      
      right: 20, 
  },
  skipIntroText: {
    backgroundColor: '#07aaf5',
    color: 'white',
    padding: 8,
    paddingBottom:10,
    paddingTop:10,
    fontSize:15,
  },
});
