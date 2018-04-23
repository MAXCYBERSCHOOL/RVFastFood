import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const headerHeight=40;
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);
//The forgraound color on the progress indicator
const activeColor="#BD1C1D"; //#fe7013

exports.static=StyleSheet.create({
    "headerImage":{
      "height":180,
      "width":width,
    },
    "border":{
      "height":1,
    },
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text:{
      color:"black"
    },
    imageHolder:{
      flex:75,
       alignItems: 'center',
       justifyContent: 'center',
    },
    imageLogoHolder:{
      alignItems: 'center',
      justifyContent: 'center',
      marginTop:40,
      marginBottom:20,
    },
    image:{
      width:200,
      height:200,
    },
    logo:{
      width:100,
      height:100,
    },
    logonav:{
      width:180,
      height:110,
    },
    logocon:{
      width:300,
      height:110,
      justifyContent: 'center',
      marginTop:100,
      marginLeft:50,
    },
    loading:{
      flex:25,
       alignItems: 'center',
       justifyContent: 'center',
    },
    list: {
      justifyContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    detailsScroll:{
      paddingVertical: 20,
      bottom:0,
      flex:1,
    },
    intemInfoLabel: {
        fontSize: 12,
        marginLeft: 10,
        marginTop: 4,
        marginRight: 8,
        color: '#333',
        fontWeight: '300',
    },
    paymentOptionsStyle:{
      justifyContent: "space-around",
      flexDirection: 'row',
      width: width,
      height: 100,
      marginTop: 10,
      marginBottom: 10
    },
    paymentOption: {
      height:100,
      width:(width/2)-20,
      borderRadius: 4,
      borderColor: "#ddd",
      borderWidth: 1,
      alignSelf: "center",
      flex:1,
      alignItems: "center",
      justifyContent: "space-around"
      },
    paymentOptionImage: {
      height:50,
      width:100
    }
});

exports.layout=StyleSheet.create({
  containerFlexability:{
    flex:1
  },
  containerBackground:{
    backgroundColor:"rgba(0,0,0,0)"
  },
  commonContainerBottom:{
    marginBottom:120
  },
  categoryList:{
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  scrollableTabViewStyle:{
    backgroundColor: '#fff'
  },
  stepIndicatorBackground:{
    backgroundColor:"#eeeeee"
  },
  cardHolder:{
    flex:10,
    paddingRight:10,
    paddingLeft:10
  },
  cartSubHolder:{
    height:60,
    flexDirection: 'row'
  },
  cardBackButtonHolder:{
    flex:2,
    paddingRight:10
  },
  orderCompletedStyleIcon:{
    alignItems:"center",
    justifyContent:"center",
    marginTop:30,
    borderRadius:60,
    height:120,
    width:120,
    backgroundColor:"red"
  },
  orderCompletedStyleText:{
    marginTop:10,
    padding:20,
    alignItems:"center",
    flex:1
  },
  orderCounter:{
    marginLeft:10,
    flex: 1,
    flexDirection: 'row',
    marginRight:10
  },
  orderOption:{
    marginLeft:10,
    flex: 1,
    marginRight:10
  },
  createInfoStr1:{
    flex:1,
    flexDirection: 'row',
    paddingLeft:20,
    paddingRight:20
  },
  orderDisplaySubContainer:{
    flex:1,
    height:26,
    backgroundColor:"gray",
    borderRadius:13,
    justifyContent:"center"
  },
  orderDisplayContainer:{
    flex:1,
    margin:10
  },
  orderDisplayText:{
    color:"#ffffff",
    marginLeft:10,
    width:200
  },
  noItemsTextStyle:{
    justifyContent: 'center',
    textAlign:'center',
    marginTop:10,
    opacity:0.7,
  },
  scrollableTabViewStyle:{
    padding: 0,
    margin: 0
  },
  tabLabelStyle:{
    flex:1,
    alignItems:"center"
  }

})

exports.dynamic={}
