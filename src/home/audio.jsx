import React, { useEffect, useState, useRef } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Slider  from "react-native-slider";
import {
  Tabs,
  Button,
  WingBlank,
  ListView,
  Flex,
} from "@ant-design/react-native";
import axios from "axios";
import { Audio } from "expo-av";
import "../../config";
const url = global.data.url;

const tabs = [
  { title: "心经", dataType: "one" },
  { title: "金刚经", dataType: "two" },
  { title: "维摩诘经", dataType: "three" },
  { title: "红楼梦", dataType: "four" },
];
const style = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  height: 550,
  backgroundColor: "#fff",
};

let dataType = "one";

const Audio1 = ({ route, navigation }) => {
  const [sound, setSound] = useState();
  // const [dataType, setDataType] = useState("one");
  // const DataT=useRef(dataType)

  useEffect(() => {
    onFetch();
  });
  //--------------------音频播放------------------

  const tabchange = (e) => {
    console.log("之前" + dataType);
    console.log(e.dataType);
    dataType = e.dataType;
    console.log("2=" + dataType);
    // console.log('e.da='+e.dataType);
    // console.log('dataType='+DataT);
    onFetch();
  };
  //----------------------渲染列表----------------------
  const onFetch = async (page = 1, startFetch, abortFetch) => {
    try {
      let pageSize = 7;
      const start = (page - 1) * pageSize;
      const params = {
        params: { srcType: "audio", dataType, page: start, num: pageSize },
      };
      const arr = await axios.get("mediaData", params);
      const rowData = arr.map((el) => {
        el.src = url + el.smSrc;
        return el;
      });
      startFetch(rowData, pageSize);
    } catch (err) {}
  };

  const renderItem = (el) => {
    // const { navigation } = this.props;
    return (
      <View>
        <WingBlank style={st.list}>
          <Flex onPress={() => {
          navigation.navigate("AudioDetail",{id:el.id});
        }}>
            <Flex.Item style={{ flex: 3, paddingLeft: 5, paddingRight: 4 }}>
              <Text>{el.title}</Text>
            </Flex.Item>
            <Flex.Item style={{ flex: 1.5, paddingLeft: 3, paddingRight: 4 }}>
              <Image style={st.img} source={{ uri: el.src }}></Image>
            </Flex.Item>
          </Flex>
        </WingBlank>

        
      </View>
    );
  };

  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <Tabs tabs={tabs} onChange={(e) => tabchange(e)}>
        <View>
          <ListView
            onFetch={onFetch}
            keyExtractor={(el, i) => `list - ${i}`}
            renderItem={renderItem}
          />
        </View>
        <View>
          <ListView
            onFetch={onFetch}
            keyExtractor={(el, i) => `list - ${i}`}
            renderItem={renderItem}
          />
        </View>
        <View>
          <ListView
            onFetch={onFetch}
            keyExtractor={(el, i) => `list - ${i}`}
            renderItem={renderItem}
          />
        </View>
        <View>
          <ListView
            onFetch={onFetch}
            keyExtractor={(el, i) => `list - ${i}`}
            renderItem={renderItem}
          />
        </View>
      </Tabs>
    </View>
  );
};
export default Audio1;

const st = StyleSheet.create({
  list: {
    width: "100%",
    alignItems: "center",
    textAlign: "center",
    height: 120,
    lineHeight: 150,
    borderBottomWidth: 1,
  },
  img: {
    width: 100,
    height: 80,
    marginTop: 10,
  },
});
