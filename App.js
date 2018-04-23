/*
  Created by Dimov Daniel
  Mobidonia
  daniel@mobidonia.com
*/
console.disableYellowBox = true; //Set to false in development

import React from 'react';
import Expo from "expo";
import { StyleSheet, Text, View, Image, ScrollView,Button,FlatList,TouchableOpacity} from 'react-native';
import { DrawerNavigator,DrawerItems,StackNavigator,TabNavigator } from 'react-navigation';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import firebase from '@datapoint/Firebase'
import css from '@styles/global'
import AppListStyle from "./App/Components/Smartrow/style";
import Master from '@containers/Master'
import Categories from '@containers/Categories'
import Categoriesindex from '@containers/Categoriesindex'
import Inscription from '@containers/Inscription'
import Details from '@containers/Details'
import Gallery from '@containers/Gallery'
import Cart from '@containers/Cart'
import Orders from '@containers/Orders'
import Config from './config'
import fun from '@functions/common';
var to = require('to-case')
import {AdMobBanner,AdMobInterstitial,PublisherBanner,AdMobRewarded} from "expo";
import {version} from './package.json';
import AppEventEmitter from "@functions/emitter"






/**
* MyMastSreen  - creates master screen
* @param {Object} navigation - the navigation data
* @param {Object} data - informations about the current screen
* @param {Object} design - design informations
* @param {Boolean} isRoot - how we should display the navigation bar
*/
const MyMastSreen = ({ navigation, data, design,isRoot }) => (
  <Master data={data} navigation={navigation} design={design} isRoot={isRoot} />
);

/**
* MyCategoriesSreen  - creates categoris screen
* @param {Object} navigation - the navigation data
* @param {Object} data - informations about the current screen
* @param {Object} design - design informations
* @param {Boolean} isRoot - how we should display the navigation bar
* @param {Object} [subMenus] - list of submenus to display
*/
const MyCategoriesSreen = ({ navigation, data, design,isRoot,subMenus }) => (
  <Categories data={data} navigation={navigation} isRoot={isRoot} subMenus={subMenus} />
);
/**
* MyCategoriesindexSreen  - creates categoris screen
* @param {Object} navigation - the navigation data
* @param {Object} data - informations about the current screen
* @param {Object} design - design informations
* @param {Boolean} isRoot - how we should display the navigation bar
* @param {Object} [subMenus] - list of submenus to display
*/
const MyCategoriesindexSreen = ({ navigation, data, design,isRoot,subMenus }) => (
  <Categoriesindex data={data} navigation={navigation} isRoot={isRoot} subMenus={subMenus} />
);
/**
* MyinscriptionSreen  - creates categoris screen
* @param {Object} navigation - the navigation data
* @param {Object} data - informations about the current screen
* @param {Object} design - design informations
* @param {Boolean} isRoot - how we should display the navigation bar
* @param {Object} [subMenus] - list of submenus to display
*/
const MyInscriptionSreen = ({ navigation, data, design,isRoot,subMenus }) => (
  <Inscription data={data} navigation={navigation} isRoot={isRoot} subMenus={subMenus} />
);


/**
* MyDetailsSreen  - creates details screen
* @param {Object} navigation - the navigation data
* @param {Object} data - informations about the current screen
* @param {Object} design - design informations
* @param {Boolean} isRoot - how we should display the navigation bar
* @param {Object} [subMenus] - list of submenus to display
*/
const MyDetailsSreen = ({ navigation, data, design,isRoot,subMenus }) => (
  <Details data={data} navigation={navigation} design={design}  />
);

/**
* MyGallerySreen  - creates gallery screen
* @param {Object} navigation - the navigation data
* @param {Object} data - informations about the current screen
* @param {Object} design - design informations
* @param {Boolean} isRoot - how we should display the navigation bar
* @param {Object} [subMenus] - list of submenus to display
*/
const MyGallerySreen = ({ navigation, data, design,isRoot,subMenus }) => (
  <Gallery data={data} navigation={navigation} design={design}  />
);

/**
* MyCartSreen  - creates cart screen
* @param {Object} navigation - the navigation data
* @param {Object} data - informations about the current screen
* @param {Object} design - design informations
* @param {Boolean} isRoot - how we should display the navigation bar
* @param {Object} [subMenus] - list of submenus to display
*/
const MyCartSreen = ({ navigation, data, design,isRoot,subMenus }) => (
  <Cart data={data} navigation={navigation} design={design}  />
);


/**
* MyOrdersSreen  - creates orders screen
* @param {Object} navigation - the navigation data
* @param {Object} data - informations about the current screen
* @param {Object} design - design informations
* @param {Boolean} isRoot - how we should display the navigation bar
* @param {Object} [subMenus] - list of submenus to display
*/
const MyOrdersSreen = ({ navigation, data, design,isRoot,subMenus }) => (
  <Orders data={data} navigation={navigation} design={design}  />
);

export default class App extends React.Component {


  //The drawler nav, initialy null, this is build while in runtime
  static navi=null;

  //The construcor
  constructor(props){
    super(props);
    this.state = {
            isReady:false,
            metaLoaded:false,
            meta:{},
            allAppsData:[]
        };

    //Bind functions to this
    this.retreiveMeta=this.retreiveMeta.bind(this);
    this.makeTheDrawer=this.makeTheDrawer.bind(this);
    this.retreiveAppDemos=this.retreiveAppDemos.bind(this);
    this.renderAppRow=this.renderAppRow.bind(this);
  }


  //When component is mounted
  async componentWillMount() {
    if(!Config.isPreview){
       //Load the data automatically, this is normal app
      this.retreiveMeta();
    }else{
      //Load list of apps
      this.retreiveAppDemos();
    }

    await Expo.Font.loadAsync({
      "Material Icons": require("@expo/vector-icons/fonts/MaterialIcons.ttf"),
      "Ionicons": require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    this.setState({ isReady: true });
  }

  //STEP 1 - Retrive metadata from Firebase db
  retreiveMeta(){
    //Get the meta data
    var _this=this;
    firebase.database().ref(Config.firebaseMetaPath).once('value').then(function(snapshot) {
      console.log("Meta retreived from "+Config.firebaseMetaPath);

      if(Config.showinterstitialAds == true)
      {
        AdMobInterstitial.setAdUnitID(Config.interstitialID);
        AdMobInterstitial.setTestDeviceID("EMULATOR");
        AdMobInterstitial.requestAd(() => AdMobInterstitial.showAd());
      }

      _this.makeTheDrawer(snapshot.val())
    });
  }

  //STEP 2 - Create the drawer and all the tree navigation
  makeTheDrawer(data){
    console.log("Meta received");
    console.log("Number of menus: "+data.navigation.menus.length);

    //Routes structure
    var routes={};
    var defaultRoute=data.navigation.menus[0].name;

    //Initialize the global design - user in other components on render
    var design=data.design;
    css.dynamic=data.design;
    AppEventEmitter.emit('colors.loaded');

    //Loop in the menus, for each item create StackNavigator with routes
    //Basicaly, for each item, create his appropriate screens inside StackNavigator
    //The master-detail type is the core one - contains Master, Categories , Master Sub and Details sceen
    //Other screens like cart and orders contains single windows
    data.navigation.menus.map((item,index)=>{
      console.log(item.name);

      //Each menu has stack nav with 3 routes, if type is master-detail or undefined
      if(item.type=="cart"||item.sectionType=="cart"){
        console.log("THIS IS CART WINDOW");
        //Create the required screens in StackNavigator
        var theScreen = StackNavigator({
          Cart: { screen: ({ navigation })=>(<MyCartSreen data={item} navigation={navigation} design={design} isRoot={true} />) },
        },{
          initialRouteName:"Cart",
          headerMode:"none",
          navigationOptions: {
            headerTintColor: 'blue',
          }
        });
      }else if(item.type=="orders"||item.sectionType=="orders"){
        console.log("THIS IS ORDER WINDOW");
        //Create the required screens in StackNavigator
        var theScreen = StackNavigator({
          Orders: { screen: ({ navigation })=>(<MyOrdersSreen data={item} navigation={navigation} design={design} isRoot={true} />) },
        },{
          initialRouteName:"Orders",
          headerMode:"none",
          navigationOptions: {
            headerTintColor: 'blue',
          }
        });
      }else if(item.type==null||item.type=="master-detail"||item.sectionType=="master-detail"||item.type=="wish-list"||item.sectionType=="wish-list"){
        console.log("THIS IS MASTER DETAIL WINDOW");
        //Create the required screens in StackNavigator
        var theScreen = StackNavigator({
          Master: { screen: ({ navigation })=>(<MyMastSreen data={item} navigation={navigation} design={design} isRoot={true} />) },
          Categories: { screen: ({ navigation })=>(<MyCategoriesSreen data={item} navigation={navigation} design={design} isRoot={item.category_first} subMenus={[]} />) },
          Categoriesindex: { screen: ({ navigation })=>(<MyCategoriesindexSreen data={item} navigation={navigation} design={design} isRoot={item.category_first} subMenus={[]} />) },
          Inscription: { screen: ({ navigation })=>(<MyInscriptionSreen data={item} navigation={navigation} design={design} isRoot={item.inscription} subMenus={[]} />) },
          MasterSUB: { screen: ({ navigation })=>(<MyCategoriesSreen data={{'categorySetup':item}} navigation={navigation} design={design} isRoot={true} subMenus={item.subMenus} />) },
          Details: { screen:({ navigation })=>(<MyDetailsSreen data={item} navigation={navigation} design={design} />) },
          Gallery: { screen:({ navigation })=>(<MyGallerySreen data={item} navigation={navigation} design={design} />) },
        },{
          initialRouteName:item.category_first?"Categories":(item.subMenus&&(item.subMenus.length>0?"MasterSUB":"Master")),
          headerMode:"none",
          navigationOptions: {
            headerTintColor: 'blue',
          }
        },{
          initialRouteName:item.category_first?"Categoriesindex":(item.subMenus&&(item.subMenus.length>0?"MasterSUB":"Master")),
          headerMode:"none",
          navigationOptions: {
            headerTintColor: 'blue',
          }
        },{
          initialRouteName:item.inscription?"Inscription":(item.subMenus&&(item.subMenus.length>0?"MasterSUB":"Master")),
          headerMode:"none",
          navigationOptions: {
            headerTintColor: 'blue',
          }
        });
      }

      //Add navigation options to each StackNavigator
      //Create icon and name
      theScreen.navigationOptions = {
        drawerLabel: item.name,
        tabBarLabel: item.name,
        drawerIcon: ({ tintColor }) => (
          <MaterialIcons name={to.slug(item.icon).replace("md-","")} size={24} style={{ color: tintColor }} />
        ),
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons name={to.slug(item.icon).replace("md-","")} size={24} style={{ color: tintColor }} />
        )
      };

      //For each item, inside the routes, add the route with givven name
      routes[item.name]={
        path: '/'+item.name,
        screen: theScreen,
      }
    });
    //END of the loop of menus
    //At this point we have all the routes created.

    //=== LAYOUT CREATION =======
    //Advance or simple coloring
    var tintColor=design.general&&design.general.coloring&&design.general.coloring=="advanced"?design.sideMenu.activeTintColor:design.general.buttonColor;

    if(design.general&&design.general.layout&&design.general.layout=="tabs"){

      //TABS
      this.navi = TabNavigator(
        routes,
        {
          showIcon:true,
          initialRouteName: defaultRoute,
          animationEnabled: false,
          tabBarPosition: 'bottom',

          tabBarOptions: {
            activeTintColor: tintColor,
            inactiveTintColor:design.sideMenu.inactiveTintColor,
            indicatorStyle: {
            backgroundColor: tintColor
           },

          style: {
            backgroundColor: design.sideMenu.activeBackgroundColor
          }

          },
          contentOptions: {
            activeTintColor: tintColor,
            activeBackgroundColor: design.sideMenu.activeBackgroundColor,
            inactiveTintColor:design.sideMenu.inactiveTintColor,
            inactiveBackgroundColor:design.sideMenu.inactiveBackgroundColor
          },
        }
      );

    }else{
      //SIDE Navigation
      this.navi = DrawerNavigator(
        routes,
        {
          initialRouteName: defaultRoute,
          contentComponent: props =>
            <ScrollView style={{backgroundColor:design.sideMenu.sideNavBgColor}}>
              <View style={css.static.imageLogoHolder}>
                <Image style={css.static.logonav} source={require('@images/sidelogo.png')} ></Image>
              </View>
              <DrawerItems {...props}></DrawerItems>
            </ScrollView>,
          contentOptions: {
            activeTintColor: tintColor,
            activeBackgroundColor: design.sideMenu.activeBackgroundColor,
            inactiveTintColor:design.sideMenu.inactiveTintColor,
            inactiveBackgroundColor:design.sideMenu.inactiveBackgroundColor
          },
        }
        );
    }

    //=== END LAYOUT ============

    //Notify the state that we have the routes and drwer created, it should rerender the initial screen
    this.setState({
      metaLoaded:true,
      meta:data,
    })
  }

  //Show Ads function
  _openInterstitial = () => {
    AdMobInterstitial.requestAd(() => AdMobInterstitial.showAd());
  };

  //DEMO STEP 1 - Retreive list of demo apps
  retreiveAppDemos(){
    var _this=this;
    //Get list of apps, and put the data in the state
    firebase.database().ref("apps").once('value').then(function(snapshot) {
      var allAppsData=snapshot.val();
      var apps=[];
      Object.keys(allAppsData).map(function(key, index) {
         allAppsData[key]["key"]=key;
         apps.push(allAppsData[key])
      });
      _this.setState({allAppsData:apps})
    });
  }

   //DEMO STEP 2 - Crerea an app row, opens single app
   renderAppRow = ({item}) => (
    <TouchableOpacity onPress={()=>{Config.firebaseMetaPath=item.key;this.makeTheDrawer(item)}}>
      <View style={[AppListStyle.standardRow,{backgroundColor:"#f7f7f7"}]}>
        <View style={AppListStyle.standardRowImageIconArea} >
          <Image style={AppListStyle.standardRowImage} source={{uri:item.appImage}} />
        </View>
        <View style={AppListStyle.standardRowTitleArea} >
          <Text>{fun.callFunction(item.key,"capitalizeFirstLetter,append~ App") }</Text>
        </View>
        <View style={AppListStyle.standardRowArrowArea} >
          <MaterialIcons name={"navigate-next"} size={24} />
        </View>
      </View>
      <View style={[AppListStyle.standardRowSeparator,{backgroundColor:"#bbbbbb"}]}><View style={[AppListStyle.border]} ></View></View>
    </TouchableOpacity>
  );

  //STEP 3 - render
  render() {
    if(this.state.metaLoaded&&this.state.isReady){
      //Data is loaded , show the Drawer
      return (<this.navi />);
    }else{
      if(!Config.isPreview){
        //Normal App, Data is not yet loaded, show the loading screen
        return (
          <View style={css.static.container}>
            <View style={css.static.imageHolder}>
              <Image style={css.static.image} source={require('@images/logo.png')} />
            </View>
            <View style={css.static.loading} >
              <Text style={css.static.text}>v {version} Loading ...</Text>
            </View>
          </View>
        )
      }else{
        //This is a preview app, show the list of Apps
        return (
            <View style={{marginTop:50}}>
                <Text style={[css.static.text,{fontSize:20}]}>    Choose an app to preview</Text>
                <FlatList
                  style={{marginTop:20}}
                  data={this.state.allAppsData}
                  renderItem={this.renderAppRow}
                />
            </View>
          )
      }

    }
  }

}
