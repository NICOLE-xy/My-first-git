//权限拦截在路由跳转
import router from '@/router'
import store from '@/store' //引入store实例，和组件中的this.$store是一回事
import nprogress from 'nprogress' //第三方插件进度条
import 'nprogress/nprogress.css'


//前置守卫
//next是前置守卫必须执行的钩子
//next() 放过
//next(false) 跳转终止
//next(地址) 跳转到某个地址
const whiteList=['/login','/404']  //定义白名单

router.beforeEach((to,from,next)=>{
  nprogress.start()  //开启进度条
  //如果有token
  if(store.getters.token){
    //如果要访问登录页
    if(to.path==='/login'){
      //则跳转到主页(实现免登录)
      next('/')
    }else{ 
      //则放过
      next()
    }
  }else{  //没有token
    //是否是白名单（没有token就可以访问的路径）
     if(whiteList.indexOf(to.path)>-1){  //将要访问的路径存在于白名单中
       next()
     }else{
       next('/login')
     }
  }
  nprogress.done()  //解决手动切换地址时进度条不关闭的问题
})
//后置守卫
router.afterEach(()=>{
  nprogress.done()  //关闭进度条

})