import React from "react";
import axios from "axios";
import { Flex,Button, InputItem, List  } from "@ant-design/react-native";
import { Text, View, StyleSheet} from "react-native";

export default class Mine extends React.Component{
    constructor(props){
        super(props)
    }
    state={
        formData:{
            phone:'',
            password:''
        }
    }
    
    render(){
        const submit=()=>{

        }
        
        return(
            <View style={st.mine}>
                <Text style={st.tit}>登录</Text>
                <InputItem style={st.input}
                type='phone'
                clear
                value={this.state.formData.phone}
                onChange={(value)=>{
                    this.setState({
                        formData:{...this.state.formData,phone:value}
                    })
                }}
                placeholder='请输入账号'
                >账号</InputItem>
                 <InputItem style={st.input}
                clear
                value={this.state.formData.password}
                onChange={(value)=>{
                    this.setState({
                        formData:{...this.state.formData,password:value}
                    })
                }}
                placeholder='请输入密码'
                >密码</InputItem>
                <Button style={st.btn} type="primary" onPress={()=>this.submit()}>登录</Button>
                <Text style={st.regist} onPress={()=>{this.props.navigation.navigate('Register')}}>新用户注册</Text>
            </View>
        )
    }
};

const st=StyleSheet.create({
    mine:{
        paddingTop:25,
        paddingHorizontal:30,
        alignItems:'center',
        justifyContent:'center'
    },
    tit:{
        fontSize:25,
        paddingBottom:20
    },
    input:{
    },
    btn:{
        width:'80%',
        marginTop:20
    },
    regist:{
        paddingTop:20
    }
})