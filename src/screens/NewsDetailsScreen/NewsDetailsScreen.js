import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Modal,
  ScrollView,
  Platform,
} from 'react-native';
import * as Urls from '../../constants/ConstantVariables/Urls';
import Loader from '../../Components/Loader/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomColors } from '../../constants/CustomColors/CustomColors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Share from "react-native-share";
import Video from 'react-native-video';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const NewsDetailsScreen = ({route,navigation}) => {

  navigation.setOptions({
    headerTitle: 'News Details',
  });
  const { itemId } = route.params; 
  const [loading,setLoading] = useState(false);
  const [optionModal,setOptionModal] = useState(false);
  const [reportModal,setReportModal] = useState(false);
  const [tableData, setTableData] = useState([ ]);
  const [errortext, setErrortext] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);
  const [loadingLargeImage, setLoadingLargeImage] = useState(false);
  const [adsImage, setAdsImage] = useState('');
  const [adsId, setAdsId] = useState();
  const [userId, setUserId] = useState();
  const [videoUrl, setVideoUrl] = useState('');
  const [commentData, setCommentData] = useState([ ]);
  const [userComment, setUserComment] = useState('');
  const [report,setReport] = useState('');

  var radio_props = [
    {label: 'Sexual content', value: 'SC' },
    {label: 'Violent or repulsive content', value: 'VR' },
    {label: 'Hateful or abusive content', value: 'HA' },
    {label: 'Harmful or dangerous acts', value: 'HD' },
    {label: 'Spam or misleading', value: 'SM' }
  ];
  useEffect(() => {
    readUserId('user_id');
    getData();
    getAds();
    getComments();
  }, []);
  const readUserId = async user_id => {
    try {
      const userId1 = await AsyncStorage.getItem(user_id);
      if (userId1 !== null) {
        setUserId(userId1);
       }
     } catch (e) {
       alert('Failed to fetch the data from storage');
     }
   };
   const handleCommentPress = () => {
    if (userComment.length == 0) 
    {
        alert('Enter Comment');
        return false;
    }
    //Show Loader
    setLoading(true);

    let dataToSend = {
      comments: userComment,
      newsId: itemId,
      userId: userId,
    };
    fetch(Urls.postComments+'?data={"data":{"newsId":"'+itemId+'", "userId":"'+userId+'", "comments":"'+userComment+'"}}', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
       // console.log(responseJson);
        if (responseJson.error == 0) {
          setLoading(false);
          let alertMessage = 'Comments added successfully.';
          alert(alertMessage);
          setUserComment('');
          getComments();
        } else {
          setLoading(false);
          alert(responseJson.errorFriendlyMessage);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
   }
   const sendReport = () => {
     console.log(report)
     setLoading(true);

    let dataToSend = {
      report_type: report,
      newsId: itemId,
      userId: userId,
    };
    fetch(Urls.newsReport, {
      method: 'POST',
      body: JSON.stringify(dataToSend),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
       // console.log(responseJson);
        if (responseJson.error == 0) {
          setLoading(false);
          let alertMessage = 'Report submitted successfully.';
          alert(alertMessage);
        } else {
          setLoading(false);
          alert(responseJson.errorFriendlyMessage);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
   }
   const getComments = () => {
    setLoading(true);
    let dataToSent = {id: itemId};
    fetch(Urls.getComments+'?data={"data":{"newsId":"'+itemId+'"}}', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.error == 0) {
          let data = responseJson.data.data;
          setCommentData(data);
          setLoading(false);
        } else {
          console.log('Please check your user name or password');
        }
      })
      .catch(error => {
        console.error(error);
      });
   }
    const getData = () => {
    setLoading(true);
    let dataToSent = {id: itemId};
    fetch(Urls.getExclusiveNewsDetails+'?data={"data":{"id":"'+itemId+'"}}', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson.error);
        if (responseJson.error == 0) {
          let data = responseJson.data.newsdetails;
          setTableData(data);
          setLoading(false);
        } else {
          console.log('Please check your user name or password');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  const getAds = () => {
    fetch(Urls.randomAds, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.error == 0) {
        setAdsImage(responseJson.data.data.small_banner_image);
          setAdsId(responseJson.data.data.id);
        } else {
          console.log('Please check your user name or password');
        }
      })
      .catch(error => {
        console.error(error);
      });
}
const goToAdDetails = id => {
  navigation.navigate('AdDetailsScreen', { itemId: id, });
}
const linkNews = () => {
  setLoading(true);
  fetch(Urls.newsLike+'?data={"data":{"newsId":"'+itemId+'", "userId":"'+userId+'", "like": "Y", "ip_address":"", "latitude":"", "longitude":""}}', {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.data ) {
        getData();
      } else {
        alert(responseJson.errorFriendlyMessage);
        setLoading(false);
      }
    })
    .catch(error => {
      console.error(error);
    });
}
const dislikeNews = () => {
  setLoading(true);
   fetch(Urls.newsLike+'?data={"data":{"newsId":"'+itemId+'", "userId":"'+userId+'", "like": "N", "ip_address":"", "latitude":"", "longitude":""}}', {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.data ) {
        getData();
      } else {
        alert(responseJson.errorFriendlyMessage);
        setLoading(false);
      }
    })
    .catch(error => {
      console.error(error);
    });
}
const shareNews = () => {
  const url = "https://www.rawnewsusa.com/";
  const title = "Awesome Contents";
  const message = "Please check this out.";

  const options = {
    title,
    url,
    message,
  };
  try {
     Share.open(options);
  } catch (err) {
    console.log(err);
  }
  console.log(itemId)
}
const showLargeImage = (videoUrl, videoType) => {
  if(videoType=='V')
  {
    console.log(videoUrl);
    setVideoUrl(videoUrl);
    setShowImageModal(true);
    setLoading(false);
  }
}
const hideActiveModal = () => {
  setLoading(false);
  setShowImageModal(false);
};
const hideOptionModal = () => {
  setLoading(false);
  setOptionModal(false);
  setReportModal(false);
}
const videoError = () => {
  console.log('error')
}
const onBuffer = () => {
  setLoading(false);
}
const onLoadStart = () =>{
  //setLoading(true);
}
const onEnd = () =>{
  setLoading(false);
}
const onLoad = () => {
  setLoading(false);
}
const showOptions = () => {
  setOptionModal(true);
}
const showReportModal = () => {
  setOptionModal(false);
  setReportModal(true);
}
   return (
  <View>  
    <ScrollView>
    <View style={styles.maincard}>
    <Loader loading={loading} />
    <View style={styles.cardnew}>
      <View style={styles.cardleft}>
        <View style={styles.cardinner}>
          <Text style={styles.cardhead}>{tableData.title}</Text>
          
        </View>

        <View>
        <View style={styles.lcd}>
        <View styles={styles.userBox}>
          <Text style={styles.cardtextUser}><FontAwesome style={styles.iconclrUsr } name="user-circle" size={24} /> {tableData.author}</Text>
        </View>  

        <View style={styles.socialIcons}>
        <TouchableOpacity
          onPress={() => linkNews()}>
          <Text style={styles.cardtext}>{tableData.totallike} <FontAwesome style={styles.iconclr} name="thumbs-up" size={24} /></Text>
        </TouchableOpacity>  
        <TouchableOpacity
          onPress={() => dislikeNews()}>
          <Text style={styles.cardtext}>{tableData.totaldislike} <FontAwesome style={styles.iconclr} name="thumbs-down" size={24} /></Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => showOptions()}>
          <Text style={styles.cardtext}> <FontAwesome style={styles.iconclr} name="ellipsis-v" size={24} /> </Text>
          </TouchableOpacity>
        </View>
        </View>
        </View>
        <TouchableOpacity
          key={tableData.id}
          onPress={() => showLargeImage(tableData.news_image,tableData.mediatype)}
          style={styles.imageContainer}
          >
          <Image
            resizeMode='contain'
            source={{
              uri: (tableData.mediatype=='I') ? tableData.news_image : tableData.videoimage
            }}
            style={styles.mainImg}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goToAdDetails(adsId)} >
        <Image
          source={{
            uri: adsImage,
            }}
          style={styles.adImg}
        />
        </TouchableOpacity>
        
       <View style={styles.cardinner}>
          <Text style={styles.cardheadLowerText}>{tableData.content}</Text>
          <Text style={{ color: '#c7c7c7', fontSize: 18, }}>{tableData.published_at}</Text>
        </View>
       {
         (commentData.length>0)? (
            <View style={styles.cardinner}>
              <Text style={{ color: '#000', fontSize: 18, marginTop: 20 }}>All Comments</Text>
            </View>
         ) : null
       }

      {
         (commentData.length>0)? (
          commentData.map((comments,index) => (
            <View style={styles.cmntBox}>
              <View styles={styles.userTestBox}>
            
                <Text style={{ color: '#000', fontSize: 18, marginTop: 10 }}>{comments.comments}</Text>
                <Text style={{ color: '#c8c8c8', fontSize: 16, marginTop: 10 }}>{comments.commentedon} by {comments.userId}</Text>
              </View>  

              <View style={styles.viewText}>
              <Text style={{ color: '#7790d3', fontSize: 18, marginTop: 10 }}>View</Text>
              </View>
              </View>
           ))
         ) : null
       }


      </View>
 
    </View>
    
  </View>


  </ScrollView>


<View style={styles.bottomView}>
  {
              (tableData.flag.length > 0) ? (<View style={styles.lowercmntBox}>

                <TextInput
                      placeholder='Comment...'
                      placeholderTextColor="red"
                      placeholderTextColor="#9e9e9e"
                      style={styles.TextInput}
                      value={userComment}
                      onChangeText={UserComment => setUserComment(UserComment)}
                          
                />
                <View style={styles.btngrp}>
                <TouchableOpacity
                onPress={() => handleCommentPress()}
                style={styles.postBtn}>
                <Text style={styles.loginTextPic}>Send</Text>
                </TouchableOpacity>
                </View>
                
                </View>  ) : null 
  }

</View>
<Modal
    animationType="slide"
    transparent={true}
    visible={showImageModal}
    onRequestClose={() => {
      // Alert.alert('Modal has been closed.');
      hideActiveModal();
    }}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
          <View style={styles.VdoFixSize}>
          <Loader loading={loading} />
          <Video source={{uri: videoUrl}}   // Can be a URL or a local file.
              
              onLoadStart={onLoadStart}     // callback when modal open start buffering
              onLoad={onLoad}               // callback when video start stop loader
              resizeMode= {'contain'}                         // Store reference
              onBuffer={onBuffer}                // Callback when remote video is buffering
              onError={videoError}               // Callback when video cannot be loaded
              onEnd={onEnd}                     // callback when video end
              style={styles.videoContainer} />
          </View>
        <TouchableOpacity
          style={[styles.button, styles.buttonClose]}
          onPress={() => hideActiveModal()}>
          <MaterialIcons name="close" size={30} color="white" />
          {/* this is view close button */}
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
  
  <Modal
    animationType="slide"
    transparent={true}
    visible={optionModal}
    onRequestClose={() => {
      hideOptionModal();
    }}>
    <View style={styles.optionModalView}>
      <View >
      <Loader loading={loading} />
        <View style={styles.buttonCloseOptionContainer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonCloseOption]}
          onPress={() => hideOptionModal()}>
          <MaterialIcons name="close" size={30} color="white" />
          {/* this is view close button */}
        </TouchableOpacity>
        </View>
          <View style={{marginTop:30}} >
          <TouchableOpacity
          onPress={() => shareNews()}>
          <Text style={styles.cardtext}> <FontAwesome style={styles.iconclr} name="share-alt" size={24} /> Share</Text>
          </TouchableOpacity>
          </View>
          <View></View>
          <View >
          <TouchableOpacity
          onPress={() => showReportModal()}>
          <Text style={styles.cardtext}> <FontAwesome style={styles.iconclr} name="flag" size={24} /> Report</Text>
          </TouchableOpacity>
          </View>
      </View>
    </View>
  </Modal>
  
  <Modal
    animationType="slide"
    transparent={true}
    visible={reportModal}
    onRequestClose={() => {
      hideOptionModal();
    }}>
    <View style={styles.reportModalView}>
      <View >
      <Loader loading={loading} />
        <View style={styles.buttonCloseOptionContainer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonCloseOption]}
          onPress={() => hideOptionModal()}>
          <MaterialIcons name="close" size={30} color="white" />
          {/* this is view close button */}
        </TouchableOpacity>
        </View>
          <View style={{marginTop:30}} >
          <RadioForm
            radio_props={radio_props}
            initial={0}
            formHorizontal={false}
            labelHorizontal={true}
            buttonColor={'#000'}
            animation={true}
            labelStyle={styles.cardtext}
            onPress={(value) => {setReport(value)}}
          />
          </View>
          <View style={styles.btngrp}>
          <TouchableOpacity
            style={[styles.postBtn]}
            onPress={() => sendReport()}>
              <Text style={styles.loginTextPic}>Send</Text>
        </TouchableOpacity>
          </View>
      </View>
    </View>
  </Modal>
</View>


  );
};

export default NewsDetailsScreen;

const styles = StyleSheet.create({
  iconclr: {
    marginTop: 15,
    color: '#000',
  },
  
  viewText: {
    marginBottom: 60,
  },

  lowercmntBox: {
   position: 'absolute',
   left: 0,
   right: 0,
   bottom: 0,
   // marginTop: 500,
    backgroundColor: "#fff",
   padding: 5,
   height: 100,
  },
  iconclrUsr: {
    color: '#03bbf9',
  },
  mainImg: {
    width: '100%',
    height: 180,
    marginBottom: 10,
  },
  
  adImg: {
    
    flex: 1,
    width: '100%',
    height: 70,
    alignItems: 'center',
    marginTop:10,
    marginBottom: 10,
  },
  TextInput: {color: CustomColors.black, 
    fontSize:18, borderWidth: 1,
    borderColor: '#9e9e9e',
    backgroundColor: '#fff',
    width: '100%',
    marginTop: 10,
    height: 40,
    padding: 10,
    justifyContent: 'center',
  },

  lcd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    margin:5,
    backgroundColor: '#f9f9f9',
  },
  userBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
    marginTop: 20,
   
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
 
  cmntBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    margin:5,
    shadowColor: '#cbcbcb',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 5,  
    elevation: 5,
    marginBottom: 30,
  },
  locationext: {
     width:'100%',
     textAlign:'left',
     fontSize:18,
     marginLeft: 20,
  },
 
  maincard: {
    alignItems: 'center',
    backgroundColor: '#eeeeee',
  },

  cardnew: {
    borderWidth: 1,
    borderColor: '#f0f0f0',
    backgroundColor: '#fff',
    width: '95%',
    marginTop: 10,
    flexDirection: 'row',
    display: 'flex',
    shadowColor: '#d9d9d9',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
  },
  cardleft: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
 
  cardinner: {
    marginBottom: 2,
    padding: 5,
  },
  cardhead: {
    color: '#333',
    
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  cardheadLowerText: {
    color: '#36a5b9',
    
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  cardtext: {
    color: '#000',
    fontSize: 18,
    marginBottom: 20,
    marginRight: 10,
    padding: 1,
    borderRadius: 15,
  },
  cardtextUser: {
    color: '#616cac',
    fontSize: 18,
    marginBottom: 20,
  },
  cardimagediv: {
    alignItems: 'center',
    paddingBottom: 5,
  },
  cardimage: {
    backgroundColor: '#ccc',
    height: 35,
    width: 35,
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
  },
  btngrp: {
    flexDirection: 'row-reverse',
    width: '100%',
  
    borderRadius: 12,
    marginTop: -70,
  },
  postBtn: {
  
    backgroundColor: '#00afee',
    color: '#fff',
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 5,
    marginTop: 80,
  },
  loginTextPic: {
    color: CustomColors.white, 
    fontSize: 16,
  },
  modalView: {
    margin: 20,
    width: '90%',
    height: '60%',
    padding:5,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 150,
    
  },
  reportModalView: {
    
    margin: 20,
    width: '100%',
    height: '50%',
    backgroundColor: 'white',
    padding: 35,
    alignItems: 'flex-start',
    elevation: 5,
    position:'absolute',
    bottom:0,
    left:-20,
    borderTopColor:'#000',
    borderWidth:1
  },
  optionModalView: {
    margin: 20,
    width: '100%',
    height: '30%',
    backgroundColor: 'white',
    padding: 35,
    alignItems: 'flex-start',
    elevation: 5,
    position:'absolute',
    bottom:0,
    left:-20,
    borderTopColor:'#000',
    borderWidth:1
  },
  buttonCloseOptionContainer: {
    position:'absolute',
    left: 20,
    top: 0,
    width:'100%',
    alignItems:'flex-end',
    alignContent:'flex-end',
  },
  cardtextOption: {
    color: '#000',
    fontSize: 22,
    marginBottom: 20,
    backgroundColor: '#07aaf5',
    marginRight: 10,
    padding: 3,
    borderRadius: 15,
  },
  buttonCloseOption: {
    backgroundColor: 'red',
    borderRadius: 9,
    alignItems:'flex-end',
    alignContent:'flex-end'
  },
  buttonClose: {
    position: 'absolute',
    right: 25,
    top: 20,
    backgroundColor: 'red',
    borderRadius: 9,
  },
  
  backgroundImage: {
    height:'100%',
    width:'100%',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
   // resizeMode: 'stretch', // or 'stretch'
  },
  VdoFixSize: {
    justifyContent:'center', 
  alignItems: 'center', 
  flex: 1,
  flexDirection: 'column',
  },
  videoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: "100%",
  },
  bottomView: {
    width: '100%',
    height: 50,
    backgroundColor: '#EE5407',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },

});
