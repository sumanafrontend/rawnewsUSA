import React, {useState, useEffect, createRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,Linking
} from 'react-native';
import Moment from 'moment';
import Loader from '../../Components/Loader/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Urls from '../../constants/ConstantVariables/Urls';
import { CustomColors } from '../../constants/CustomColors/CustomColors';

const AdDetailsScreen = ({route,navigation}) => {
  navigation.setOptions({
    headerTitle: 'Ads Details',
  });
  const { itemId } = route.params; 
  const [loading,setLoading] = useState(false);
  const [tableData, setTableData] = useState([ ]);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    setLoading(true);
    fetch(Urls.adDetails+'?data={"data":{"id":"'+itemId+'"}}', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson.error);
        if (responseJson.error == 0) {
          let data = responseJson.data.data;
          setTableData(data);
          setLoading(false);
        } else {
          console.log('Something went wrong');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  const goToWebsite = (val) => {
    Linking.openURL(val);
  }
  const goToTel = (val) => {
    Linking.openURL(`tel:${val}`)
  }
  return (
    <ScrollView>  
    <View style={styles.container}>
      <Loader loading={loading} />
      <View style={styles.innercontainer}>
          <View style={styles.input}>
            <Text style={styles.TextInput}>Ad Name</Text>
            <Text style={styles.TextInputtext}>{tableData.business_name}</Text>
          </View>
          <View style={styles.input}>
            <Text style={styles.TextInput}>Website URL</Text>
            <TouchableOpacity onPress={() => goToWebsite(tableData.weburl)}>
            <Text style={styles.TextInputtext}>{tableData.weburl}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.input}>
            <Text style={styles.TextInput}>Location</Text>
            <Text style={styles.TextInputtext}>{tableData.address1}</Text>
            </View>
          <View style={styles.input}>
            <Text style={styles.TextInput}>Email</Text>
            <Text style={styles.TextInputtext}>{tableData.email}</Text>
          </View>
          <View style={styles.input}>
            <Text style={styles.TextInput}>Contact Information</Text>
            <TouchableOpacity onPress={() => goToTel(tableData.contactno)}>
            <Text style={styles.TextInputtext}>{tableData.contactno}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.input}>
            <Text style={styles.TextInput}>Other Information</Text>
            <Text style={styles.TextInputtext}>{tableData.otherinfo}</Text>
          </View>
          <View style={styles.inputImage}>
          <Image
           resizeMode='contain'
           source={{
            uri: tableData.bannerimg,
            }}
            style={styles.mainImg}
          />
          </View>
          </View>
          </View>
  
    </ScrollView>
  );
};

export default AdDetailsScreen;

const styles = StyleSheet.create({
  bnrimg: {
    color: "#9e9e9e",
    marginTop: 50,
    marginBottom: 0,
    fontSize: 18,
  },  
  bigbnrimg: {
    color: "#9e9e9e",
    marginTop: 40,
    marginBottom: 0,
    fontSize: 18,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    
  },
  innercontainer: {
    flex: 1,
    width:'100%',
    alignItems: 'flex-start',
    marginLeft:40
  },
  input: {
    borderWidth: 1,
    borderColor: '#9e9e9e',
    backgroundColor: '#fff',
    width: '90%',
    marginTop: 30,
    height: 60,
    padding: 10,
    justifyContent: 'center',
    borderRadius: 5,
  },
  camragrp: {
    flexDirection:'row',
    width:'40%',
    height:40,
    marginTop:15,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  btngrp: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
  
    borderRadius: 12,
    marginTop: 30,
  },
  picBtn: {
    width: '50%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: CustomColors.blue,

  },
  vdoBtn: {
    width: '50%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: CustomColors.white,
  },
  textAreaContainer: {
    width: '90%',
    backgroundColor: '#ebebeb',
    marginTop: 30,
    borderRadius: 20,
    height: 250,
    padding: 10,
  },
  postBtn: {
    marginTop: 20,
    backgroundColor: '#00afee',
    color: '#fff',
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  plusIcon: {
    padding:0,
    paddingRight:10,
  },
  browseText: {
    color: CustomColors.white, 
    fontSize:20,
  },
  loginTextPic: {
    color: CustomColors.white, 
    fontSize:24,
  },
  loginTextVdo: {fontSize:18},
  loginTextAddPic: {fontSize:18, color: '#fff'},
  TextInput: {color: CustomColors.black, fontSize:20, fontWeight: 'bold'},
  TextInputtext: {color: CustomColors.black, fontSize:15, },
  capturebtn: {
    
    
    flex:1,
    flexDirection:'row',
    backgroundColor: '#3c3c3c',
    borderRadius: 5,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainImg: { flex: 1,
    width: '100%',
    
    aspectRatio: 1,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    
  },
  inputImage: {
    position: 'relative',
    borderWidth: 1,
    borderColor: '#9e9e9e',
    backgroundColor: '#fff',
    width: '90%',
    height:450,
    marginTop: 30,
    padding:0,
    justifyContent: 'center',
    borderRadius: 5,
    alignItems:'center',
  },
  
});
