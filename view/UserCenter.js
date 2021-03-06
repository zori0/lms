import React, {Component} from 'react'
import {
    View,
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    NavigatorIOS,
    AsyncStorage,
    AlertIOS
} from 'react-native'

'use district';

import Util from '../view/util/Util'
import ChangePassword from '../view/ChangePassword'
import MyCode from '../view/MyCode'
import Login from '../view/Login'
import Main from './Main'

import ChildNumber from '../view/ChildNumber'

export default class extends Component{

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            unionBusinessName:'',
            mobile:'',
            isLogin:false,
            unionBusinessId:'',
            tokenid:''
        };
    }

    componentDidMount() {
        if(this.props.tokenid!=""){
            this.setState({
                isLogin:true,
                unionBusinessId:this.props.unionBusinessId,
                unionBusinessName:this.props.unionBusinessName,
                mobile:this.props.mobile,
                tokenid:this.props.tokenid
            });
        }else{
            this.setState({
                isLogin:false,
                unionBusinessId:'',
                unionBusinessName:'',
                mobile:'',
                tokenid:''
            });
        }

    }

    childNumber(){
        if(this.state.isLogin!=''){
            this.props.navigator.push({
                component:ChildNumber,
                title:'',
                navigationBarHidden:true,
                passProps:{
                    unionBusinessId:this.props.unionBusinessId
                }
            });
        }else{
            this.props.navigator.push({
                component:Login,
                title:'',
                navigationBarHidden:true,
                passProps:{

                }
            });
        }
    }

    myCode(){
        if(this.state.isLogin!=''){
            this.props.navigator.push({
                component:MyCode,
                title:'',
                navigationBarHidden:true,
                passProps:{
                    unionBusinessId:this.props.unionBusinessId
                }
            });
        }else{
            this.props.navigator.push({
                component:Login,
                title:'',
                navigationBarHidden:true,
                passProps:{

                }
            });
        }
    }

    changePassword(){
        if(this.state.isLogin!=''){
            this.props.navigator.push({
                component:ChangePassword,
                title:'',
                navigationBarHidden:true,
                passProps:{
                    unionBusinessId:this.props.unionBusinessId
                }
            });
        }else{
            this.props.navigator.push({
                component:Login,
                title:'',
                navigationBarHidden:true,
                passProps:{

                }
            });
        }
    }

    checkVersion(){

    }

    goBack(){
        this.props.navigator.push({
            component:Main,
            title:'',
            passProps:{
                tokenid:this.state.tokenid,
                unionBusinessId:this.state.unionBusinessId,
                unionBusinessName:this.state.unionBusinessName,
                mobile:this.state.mobile
            },
            navigationBarHidden:true
        });
    }

    logOut(){
        AlertIOS.alert('确定要退出登录吗','',
            [
                {text: '取消', onPress: () =>{}},
                {text: '确定', onPress: () => {
                    AsyncStorage.removeItem('tokenid');
                    AsyncStorage.removeItem('unionBusinessId');
                    AsyncStorage.removeItem('unionBusinessName');
                    this.setState({
                        isLogin:false,
                        unionBusinessId:'',
                        unionBusinessName:'',
                        mobile:'',
                        tokenid:''
                    });
                }}
            ]
        );
    }

    goLogin(){
        this.props.navigator.push({
            component:Login,
            title:'',
            navigationBarHidden:true
        })
    }

    render(){
        var header;
        let logout = null;
        if(this.state.isLogin!=''){
            header = (
                <View><Text style={[styles.user_text,styles.fontWhite]}>{this.props.unionBusinessName}</Text>
                    <Text style={styles.fontWhite}>{this.props.mobile}</Text></View>
            );
            logout = (
                <TouchableHighlight onPress={()=>this.logOut()} underlayColor="transparent"  style={styles.flex_row}>
                    <View style={[styles.logout,styles.flex_row]}>
                        <Text style={[styles.logout_text,styles.flex_row]}>退出登录</Text>
                    </View>
                </TouchableHighlight>
            );
        }else{
            header = (<TouchableHighlight onPress={()=>this.goLogin()} underlayColor="transparent"><View style={styles.loginButton}><Text style={styles.fontWhite}>马上登录</Text></View></TouchableHighlight>);
        }

        return(
                <View style={[styles.flex_column]}>
                    <View style={[styles.flex_column,styles.headerContianer]}>
                            <View style={[styles.default_head]}>
                                <Image source={require('../view/images/defualt_head.imageset/defualt_head.png')}/>
                            </View>
                                {header}
                            <TouchableHighlight onPress={()=>this.goBack()} underlayColor="transparent" style={[styles.back]}>
                                <Image source={require('../view/images/return.imageset/return.png')} style={[]}/>
                            </TouchableHighlight>
                    </View>
                    <View style={[styles.flex_column,styles.contentContianer]}>
                        <TouchableHighlight underlayColor="transparent" style={styles.flex_row} onPress={()=>this.childNumber()}>
                            <View style={[styles.flex_row,styles.row_box]}>
                                <View style={[styles.flex_row,{alignItems:'center'}]}>
                                    <Image source={require('../view/images/account.imageset/c_account.png')}
                                           style={styles.image_box}/>
                                    <Text style={[styles.row_box_text]}>我的子账号</Text>
                                </View>
                                <Image source={require('../view/images/rightbutton.imageset/rightbutton.png')} style={styles.image_box}/>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight underlayColor="transparent" style={styles.flex_row} onPress={()=>this.myCode()}>
                            <View style={[styles.flex_row,styles.row_box]}>
                                <View style={[styles.flex_row,{alignItems:'center'}]}>
                                    <Image source={require('../view/images/QRCode.imageset/QR_code.png')}
                                           style={styles.image_box}/>
                                    <Text style={[styles.row_box_text]}>我的推广专属二维码</Text>
                                </View>
                                <Image source={require('../view/images/rightbutton.imageset/rightbutton.png')} style={styles.image_box}/>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight underlayColor="transparent" style={styles.flex_row} onPress={()=>this.changePassword()}>
                            <View style={[styles.flex_row,styles.row_box]}>
                                <View style={[styles.flex_row,{alignItems:'center'}]}>
                                    <Image source={require('../view/images/lock.imageset/lock.png')}
                                           style={styles.image_box}/>
                                    <Text style={[styles.row_box_text]}>修改密码</Text>
                                </View>
                                <Image source={require('../view/images/rightbutton.imageset/rightbutton.png')} style={styles.image_box}/>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight underlayColor="transparent" style={styles.flex_row} onPress={()=>this.checkVersion()}>
                            <View style={[styles.flex_row,styles.row_box]}>
                                <View style={[styles.flex_row,{alignItems:'center'}]}>
                                    <Image source={require('../view/images/version.imageset/flush.png')}
                                           style={styles.image_box}/>
                                    <Text style={[styles.row_box_text]}>检测新版本</Text>
                                </View>
                                <Text style={[styles.version_box]}>V1.0.0</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={[styles.flex_row,{backgroundColor:'#eee'}]}>
                        {logout}
                    </View>
                </View>

        )
    }

}

const styles = StyleSheet.create({

    flex_row:{
        flex:1,
        flexDirection:'row'
    },
    flex_column:{
        flex:1,
        flexDirection:'column'
    },
    headerContianer:{
        marginTop:20,
        backgroundColor:'orangered',
        borderWidth:Util.pixel,
        borderColor:'orangered',
        height:150,
        justifyContent:'center',
        alignItems:'center'
    },
    contentContianer:{
        marginTop:20
    },
    row_box:{
        justifyContent:'center',
        alignItems:'center',
        borderBottomWidth:Util.pixel,
        borderBottomColor:'#eee',
        paddingBottom:10,
        paddingTop:10
    },
    image_box:{
        marginLeft:10,
        marginRight:10
    },
    row_box_text:{

        fontSize:15,
        textAlign:'center',
        alignItems:'flex-start'
    },
    logout:{
        height:40,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        width:Util.size.width-20,
        marginTop:10
    },
    logout_text:{
        fontSize:15,
        textAlign:'center',
        backgroundColor:'white'
    },
    back:{
        position:'absolute',
        top:20,
        left:30,
        width:40
    },
    user_text:{
        marginTop:10
    },
    fontWhite:{
        color:'white',
        fontSize:15,
        paddingBottom:2
    },
    loginButton:{
        borderColor:'white',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10,
        borderWidth:Util.pixel,
        height:20,
        borderRadius:3,
        paddingLeft:10,
        paddingRight:10
    },
    version_box:{
        marginRight:10,
        fontSize:12,
        color:"#d8bfd8"
    },
    default_head:{
        padding:10,
        borderWidth:1,
        borderColor:'aliceblue',
        borderRadius:50
    }

});