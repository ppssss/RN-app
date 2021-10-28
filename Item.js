import Subject from './src/home/Subject'
import Index from './src/home/Index'
import Detail from './src/home/Deatai'
import AudioDetail from './src/home/audioDetail'
import Register from './src/home/register'

const Items=[
    {id:1,name:'Subject',component:Subject,options:{headerShown:false}},
    {id:2,name:'Index',component:Index,options:{headerShown:false}},
    {id:3,name:'Detail',component:Detail,options:{headerShown:true,title:'文章详情'}},
    {id:4,name:'AudioDetail',component:AudioDetail,options:{headerShown:true,title:'音频播放'}},
    {id:5,name:'Register',component:Register,options:{headerShown:true,title:'用户注册'}}

]

export default Items