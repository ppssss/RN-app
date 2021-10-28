import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Icon, SearchBar, TabBar } from "@ant-design/react-native";
import Home from './home'
import Audio from "./audio";
import Mine from "./mine";
export default class Subject extends React.Component {
  constructor(props){
    super(props)
  }
  state = {
    selectedTab: "blueTab",
  };

  renderContent(pageText) {
    return (
      <View style={st.index}>
        <SearchBar placeholder="Search" showCancelButton />
        <Text style={{ margin: 50 }}>{pageText}</Text>
      </View>
    );
  }
  onChangeTab(tabName) {
    this.setState({
      selectedTab: tabName,
    });
  }
  render() {
    return (
      <TabBar>
        <TabBar.Item
          title="首页"
          icon={<Icon name="book" />}
          selected={this.state.selectedTab === "blueTab"}
          onPress={() => this.onChangeTab("blueTab")}
        >
          <Home {...this.props}/>
        </TabBar.Item>
        <TabBar.Item
          icon={<Icon name="audio" />}
          title="经典"
          badge={6}
          selected={this.state.selectedTab === "redTab"}
          onPress={() => this.onChangeTab("redTab")}
        >
          <Audio  {...this.props}/>
        </TabBar.Item>
        <TabBar.Item
          icon={<Icon name="save" />}
          title="播放记录"
          selected={this.state.selectedTab === "greenTab"}
          onPress={() => this.onChangeTab("greenTab")}
        >
          {this.renderContent("Friend Tab")}
        </TabBar.Item>
        <TabBar.Item
          icon={<Icon name="user" />}
          title="我的"
          selected={this.state.selectedTab === "yellowTab"}
          onPress={() => this.onChangeTab("yellowTab")}
        >
         <Mine {...this.props}/>
        </TabBar.Item>
      </TabBar>
    );
  }
}
const st = StyleSheet.create({
  index: {
    alignItems: "center",
    backgroundColor: "red",
  },
});
