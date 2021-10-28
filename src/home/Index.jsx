import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { Button, WhiteSpace, WingBlank } from "@ant-design/react-native";
import '../../config'
const {url}=global.data
const image = { uri: `${url}images/(5).jpg` };

function Index({navigation}) {  
    return (
      <View style={st.index}>
        <ImageBackground source={image} resizeMode="cover" style={st.image}>
          <Button style={st.btn} type="warning" onPress={()=>{
            navigation.navigate('Subject')
          }}>
            进入学习
          </Button>
        </ImageBackground>
      </View>
    );
}
const st = StyleSheet.create({
  index: {
    flex: 1,
    textAlign: "center",
  },
  image: {
    flex: 1,
    alignItems: "center",
  },
  btn: {
    marginVertical: 25,

    width: 200,
  },
});
export default Index