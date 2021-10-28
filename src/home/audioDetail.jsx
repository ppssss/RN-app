import React, { useEffect, useState } from "react";
import axios from "axios";
import { Flex } from "@ant-design/react-native";
import Slider from "react-native-slider";
import { Text, View, StyleSheet, Button, Image } from "react-native";
import { Audio } from "expo-av";
import "../../config";
const { url } = global.data;

let total=''
let timer=''
export default function AudioDetail({ route }) {
  const [sound, setSound] = useState();
  const [obj, setObj] = useState({});
  const [curtime, setCurtime] = useState(0);
  const [percent, setPercent] = useState(0);
 

  useEffect(() => {
    // paly()
   
    const id = route.params.id;
    axios.get("getAudioId", { params: { id } }).then((obj) => {
      setObj(obj);
    });
  });

  // useEffect(()=>{
  //   console.log('1');
    
  // },[percent])


  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({ uri: obj.url });
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
    let temp=await sound.getStatusAsync()
    total=parseInt(temp.durationMillis/1000)
    
    timer= setInterval(() => {
      setPercent(temp.positionMillis);
      console.log(temp.positionMillis);
    }, 1000);
    // setPercent(curtime/total)
    // setTotal( );
  }

  async function pauseSound() {
    await sound.pauseAsync();
  }
  const currchange=(v)=>{
    console.log(v);
    console.log(total);
    console.log(percent);
    setCurtime(parseInt(v*total))
    sound.setPositionAsync(v*total*1000)
  }
  

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
          clearInterval(timer)
        }
      : undefined;
  }, [sound]);

  return (
    <View style={st.detail}>
      <Image style={st.img} source={{ uri: `${url}${obj.smSrc}` }}></Image>
      <Text style={st.title}>{obj.title}</Text>
      <Flex>
        <Flex.Item style={{ flex: 3, paddingLeft: 5, paddingRight: 4 }}>
          <Button title="播放" onPress={playSound}>
            go
          </Button>
        </Flex.Item>
        <Flex.Item style={{ flex: 3, paddingLeft: 3, paddingRight: 4 }}>
          <Button style={st.btn} title="暂停" onPress={pauseSound}>
            stop
          </Button>
        </Flex.Item>
      </Flex>
      <Flex>
        <Flex.Item style={{ flex: 16, paddingLeft: 5, paddingRight: 4 }}>
          <Slider   onValueChange={(value)=>currchange(value)}/>
        </Flex.Item>
        <Flex.Item style={{ flex: 4, paddingLeft: 5, paddingRight: 4 }}>
          <Text>{curtime}/{total}</Text>
        </Flex.Item>
      </Flex>
    </View>
  );
}

const st = StyleSheet.create({
  detail: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    margin: 20,
  },
  btn: {
    marginTop: 20,
  },
  img: {
    width: "100%",
    height: 200,
  },
  slide: {
    // width: "100%",
  },
});
