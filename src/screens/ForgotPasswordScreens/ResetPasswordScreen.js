import React from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const ResetPasswordScreen = () => {
  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.subcontainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Passsword"
              keyboardType="email-address"
              secureTextEntry={true}
              autoCapitalize="none"
              placeholderTextColor="black"
              // onChangeText={val => this.onChangeText('username', val)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Confirm Password"
              secureTextEntry={true}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="black"
              // onChangeText={val => this.onChangeText('username', val)}
            />
            <View style={styles.btngrp}>
              <TouchableOpacity style={styles.submitbtn}>
                <Text style={styles.btnText}> Reset Password</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // backgroundColor: '#46d4c4',
    height: '100%',
  },
  subcontainer: {
    marginTop: 18,
    alignContent: 'center',
  },
  input: {
    width: 350,
    height: 55,
    // backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'black',
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  btngrp: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cancelbtn: {
    height: 55,
    width: '40%',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  btnText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  },
  submitbtn: {
    height: 55,
    width: '40%',
    backgroundColor: '#3492eb',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
});
