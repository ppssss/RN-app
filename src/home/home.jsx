import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image
} from "react-native";
import {
  Carousel,
  WingBlank,
  Button,
  ListView,
  Flex,
} from "@ant-design/react-native";
import { Tabs } from "@ant-design/react-native";
import axios from "axios";
import "../../config";
const url = global.data.url;
const { height } = Dimensions.get("window");

export default class Home extends React.Component {
  //   onHorizontalSelectedIndexChange = (index) => {
  //     /* tslint:disable: no-console */
  //     console.log("horizontal change to", index);
  //   };
  //    onVerticalSelectedIndexChange = (index) => {
  //     /* tslint:disable: no-console */
  //     console.log("vertical change to", index);
  //   };
  // state = {
  //   props:this.props
  // };
  componentDidMount(){
  }
  render() {
    const tabs = [
      { title: "热点" },
      { title: "体育" },
      { title: "军事" },
      { title: "国际" },
    ];
    const style = {
      alignItems: "center",
      justifyContent: "center",
      height: 550,
      backgroundColor: "#fff",
    };

    const onFetch = async (page = 1, startFetch, abortFetch) => {
      try {
        let pageSize = 5;
        const start = (page - 1) * pageSize;
        const params = { params: { start, pageSize } };
        const arr = await axios.get("getArt", params);
        const rowData = arr.map((el) => {
          el.src = url + "smallSrc/" + el.smSrc;
          return el;
        });
        startFetch(rowData, pageSize);
      } catch (err) {
        abortFetch();
      }
    };

    const renderItem = (el) => {
      const {navigation}=this.props;
      return (
        <WingBlank style={st.list}>
          <Flex onPress={()=>navigation.push('Detail',{id:el.id})}>
            <Flex.Item style={{flex:3, paddingLeft: 5, paddingRight: 4 }}>
              <Text>{el.title}</Text>
            </Flex.Item>
            <Flex.Item style={{flex:1.5, paddingLeft: 3, paddingRight: 4 }}>
              <Image style={st.img} source={{uri:el.src}}></Image>
            </Flex.Item>
          </Flex>
        </WingBlank>
      );
    };

    return (
      <View style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 15 }}>
          <Carousel
            style={st.wrapper}
            selectedIndex={2}
            autoplay
            infinite
            // afterChange={onHorizontalSelectedIndexChange}
          >
            <View style={[st.containerHorizontal]}>
                <Image style={st.carimg} source={{uri:`${url}images/(1).jpg`}}></Image>
            </View>
            <View style={[st.containerHorizontal]}>
            <Image style={st.carimg} source={{uri:`${url}images/(2).jpg`}}></Image>
            </View>
            <View
              style={[st.containerHorizontal]}
            >
                <Image style={st.carimg} source={{uri:`${url}images/(3).jpg`}}></Image>
            </View>
            <View style={[st.containerHorizontal]}>
            <Image style={st.carimg} source={{uri:`${url}images/(4).jpg`}}></Image>
            </View>
            <View
              style={[st.containerHorizontal]}
            >
                <Image style={st.carimg} source={{uri:`${url}images/(5).jpg`}}></Image>
            </View>
          </Carousel>
        </View>
        <Tabs tabs={tabs}>
          <View>
            <ListView
              //   style={{height:height-50}}
              onFetch={onFetch}
              keyExtractor={(el, i) => `list - ${i}`}
              renderItem={renderItem}
            />
          </View>
          <View style={style}>
            <Text>Content of Second Tab</Text>
          </View>
          <View style={style}>
            <Text>Content of Third Tab</Text>
          </View>
          <View style={style}>
            <Text>Content of Third Tab</Text>
          </View>
        </Tabs>
      </View>
    );
  }
}
const st = StyleSheet.create({
  list: {
    alignItems: "center",
    textAlign: "center",
    height: 150,
    lineHeight: 150,
  },
  carimg:{
      height:'100%',
      width:'100%'
  },
  img:{
      width:'100%',
      height:130
  },
  wrapper: {
    marginTop:20,
    backgroundColor: "#fff",
    height: 200,
  },
  containerHorizontal: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 150,
  },
  containerVertical: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 150,
  },
  text: {
    color: "#fff",
    fontSize: 36,
  },
});
