import * as React from "react";
import * as Font from "expo-font";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { WhiteSpace, Button } from "@ant-design/react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Items from "./Item";
import Detail from "./src/home/Subject";
import Poster from "./src/home/Index";
import axios from 'axios'

//-------axios全局配置------------
axios.defaults.baseURL="http://192.168.1.13:1337/users";
axios.defaults.timeout=5000;
axios.interceptors.response.use(
  response=>{
    return Promise.resolve(response.data)
  },
  error=>{
    return Promise.reject(error.response)
  }
)

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={() => navigation.navigate(Detail)} type="warning">
        Detail
      </Button>
      {/* <WhiteSpace size="lg"></WhiteSpace> */}
      <Button
        onPress={() => navigation.navigate(Poster)}
        style={{ marginTop: 30 }}
        type="ghost"
      >
        Poster
      </Button>
    </View>
  );
}

const Stack = createNativeStackNavigator(); //创建堆栈导航

export default class App extends React.Component {
  state = {
    isReady: false,
  };
  async componentDidMount() {
    await Font.loadAsync(
      "antoutline",
      // eslint-disable-next-line
      require("@ant-design/icons-react-native/fonts/antoutline.ttf")
    );

    await Font.loadAsync(
      "antfill",
      // eslint-disable-next-line
      require("@ant-design/icons-react-native/fonts/antfill.ttf")
    );
    // eslint-disable-next-line
    this.setState({ isReady: true });
  }
  render(h) {
    const { isReady } = this.state;
        if (!isReady) {
          return null;
        }
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Index">
          {Items.map((el) => {
            return (
              <Stack.Screen
              key={el.id}
                name={el.name}
                component={el.component}
                options={el.options}
              />
            );
          })}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
