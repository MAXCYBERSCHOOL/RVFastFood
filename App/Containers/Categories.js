/*
  Created by Dimov Daniel
  Mobidonia
  daniel@mobidonia.com
*/
import React, { Component, PropTypes } from "react";
import { Button, Text, View, Image, FlatList, StyleSheet, TouchableOpacity, Linking, ActivityIndicator } from "react-native";
import Navbar from '@components/Navbar'
import firebase from '@datapoint/Firebase'
import css from '@styles/global'
import Smartrow from '@smartrow'
import Config from '../../config'
import { Ionicons } from '@expo/vector-icons';
import fun from '@functions/common'
import CartFunction from '@functions/cart'
import T from '@functions/translation'
import AppEventEmitter from "@functions/emitter"
import { FormLabel, FormInput } from 'react-native-elements'
import ButtonUNI from '../Components/Buttons/Button';
import PasswordInputText from 'react-native-hide-show-password-input';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from "expo";


export default class Categories extends Component {

  //The constructor
  constructor(props) {
    super(props);


    //login password
    this.state = { email:'', password:'', loading:false};
     //Bind the functions
     this.openLogin=this.openLogin.bind(this);
     this.openInscription=this.openInscription.bind(this);
  }

  //Component Mount function


  openLogin() {
    this.setState({error:'', loading: true });
    const {email, password} = this.state; 
    console.log(password);
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ error: '', loading: false });
        this.props.navigation.navigate('Categoriesindex');

      })
      .catch(() => {
        this.setState({ error: 'Echec Authentification', loading: false })
        
      })
    
  }
  openInscription() {  
        this.props.navigation.navigate('Inscription');  
  }
  renderButtonOrLoading() {
    if (this.state.loading) {
      return <Text>Connexion en Cours...</Text>
    }
   
  }




  render() {

    return (
      <View style={css.layout.containerBackground}>
        <Image style={css.static.logocon} source={require('@images/navlogocon.png')} ></Image>

        <FormLabel>{T.login}</FormLabel>
        <FormInput style={{paddingLeft:5}}
          value={this.state.email}
          onChangeText={email => this.setState({email})}
          placeholder={T.enter_login}
          keyboardType='email-address'
        />
        <FormLabel>{T.password}</FormLabel>
        <FormInput style={{paddingLeft:5}}
          value={this.state.password}
          onChangeText={password => this.setState({password})}
          placeholder={T.enter_pwd}
          keyboardType='default'
          secureTextEntry={true}
        />
        <View style={{ height: 60, paddingLeft: 20, paddingRight: 20 }}>
          <ButtonUNI
            opacity={this.state.cart && this.state.cart.length > 0 ? 1 : 0.5}
            onPress={this.openLogin}
            text={T.connexion}
          />
        </View>
        <Text style={{ paddingLeft: 20, paddingRight: 20 }}
        onPress={this.openInscription}> Inscription</Text>
        <Text style={{ paddingLeft: 20, paddingRight: 20 }}> Mot de Passe Oublié?</Text>



      </View>
    );
  }
}
