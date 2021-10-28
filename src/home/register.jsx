import React, { useEffect, useState } from "react";
import axios from "axios";
import { Flex, Button, InputItem, List } from "@ant-design/react-native";
import { Text, View, StyleSheet } from "react-native";

export default Regist = () => {
  const [formData, setFormData] = useState({
    usename: "",
    phone: "",
    password: "",
    repassword: "",
  });
  const submit = () => {
    if (formData.password !== formData.repassword) {
      alert("两次密码不一致");
    }
    for (let i in formData) {
      if (formData[i] == "") {
        alert("请输入完整");
        return;
      }
    }
    axios.get("addusers", { params: formData }).then((arr) => {
      console.log(arr);
    });
  };
  return (
    <View>
      <InputItem
        clear
        value={formData.usename}
        onChange={(value) => {
          setFormData({
            ...formData,
            usename: value,
          });
        }}
        placeholder="请输入账号"
      >
        用户名
      </InputItem>
      <InputItem
        type="phone"
        clear
        value={formData.phone}
        onChange={(value) => {
          setFormData({
            ...formData,
            phone: value,
          });
        }}
        placeholder="请输入手机号"
      >
        手机号
      </InputItem>
      <InputItem
        clear
        value={formData.password}
        type='password'
        onChange={(value) => {
          
            setFormData({ ...formData, password: value });
          
        }}
        placeholder="请输入密码"
      >
        密码
      </InputItem>
      <InputItem
        clear
        type='password'
        value={formData.repassword}
        onChange={(value) => {
          setFormData({ ...formData, repassword: value });
        }}
        placeholder="请确认密码"
      >
        确认密码
      </InputItem>
      <Button onPress={() => submit()}>注册</Button>
    </View>
  );
};
