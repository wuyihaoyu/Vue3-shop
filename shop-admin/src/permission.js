import{ router,addRoutes} from "~/router";
import { getToken } from "~/composables/auth"
import {toast,showFullLoading,hideFullLoading} from "~/composables/util"
import store from "./store";

let hasGetInfo = false
router.beforeEach(async(to,from,next)=>{

    //显示Loading
    showFullLoading()


    const token = getToken()

    if(!token && to.path !='/login'){

         toast("请先登录","error")
         return next({path:'/login'})
    }

    if(token && to.path == "/login" ){
        toast("请勿重复登录","error")
        return next({path:from.path ? from.path : "/login" })
    }
    let hasNewRoutes =false 
    if(token && !hasGetInfo){
       let {menus} = await store.dispatch("getinfo")
       hasGetInfo = true
       //动态添加路由
       hasNewRoutes = addRoutes(menus)
    }

    //设置页面标题
    let title = (to.meta.title ? to.meta.title :'') + "-帝莎编程商城后台"
    
    document.title=title,
    
    hasNewRoutes?next(to.fullPath):next()
})


router.afterEach((to, from) => {
    // to and from are both route objects.
    hideFullLoading()
})