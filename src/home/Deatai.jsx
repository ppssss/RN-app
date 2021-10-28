import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Image
} from "react-native";
import { Button, WhiteSpace, WingBlank,image } from "@ant-design/react-native";
import HTMLView  from "react-native-htmlview";
import axios from "axios";
import { useEffect } from "react";
import "../../config";
const url = global.data;
// const image = { uri: "https://reactjs.org/logo-og.png" };

function Detail ({ route, navigation }) {
  const [obj, setObj] = useState({});
  const [src, setSrc] = useState('');
  const id = route.params.id;
  useEffect(() => {
    
    axios.get("getArtId?id=" + id).then((el) => {
      el.content = el.content.replace(/\{\{imgUrl\}\}/g, 'http://192.168.1.13:1337/');
      const temp=el.content.match(/"[^>]+/);
      setSrc(temp[0].slice(0,temp[0].length-1).replace(/\"/g,""))
      // console.log(src );
      // el.src=temp[0].slice(0,temp[0].length-1).replace(/\"/g,"")
      setObj(el);
      return el
      
    });
  }, []);
  return (
    <ScrollView style={st.detail1}>
      <View>
        <Text style={st.tit}>{obj.title}</Text>
        <Image style={st.imag} source={{uri:src}}></Image>
        <Text style={st.content}>                                                                                                                                                                                                                                                                                                   
          <HTMLView value={obj.content}></HTMLView>
        </Text>
      </View>
    </ScrollView>
  );
}
const st = StyleSheet.create({
  detail1: {
    flex: 1,
    
  },
  imag:{
    width:'100%',
    flex:1,
     height:150,
     marginBottom:10
  },
  
  btn: {
    marginVertical: 25,

    width: 200,
  },
  tit: {
    margin: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    flex:1,
    width:'100%'
  },
});
export default Detail;
