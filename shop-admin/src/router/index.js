import {createRouter,createWebHashHistory } from 'vue-router'
import Index from "~/pages/index.vue"
import Login from "~/pages/login.vue"
import NotFound from "~/pages/404.vue"
import Admin from "~/layouts/admin.vue"
import GoodList from "~/pages/goods/list.vue"
import CategoryList from "~/pages/category/list.vue"

const routes = [
    {
        path: '/', 
        name:"admin",
        component: Admin,
        
    },
    { 
        path: '/login',
        component: Login ,
        meta:{
            title:"登录页",
        } 
    }, 
    { 
        path: '/:pathMatch(.*)*', 
        name: 'NotFound', 
        component: NotFound 
    },
  ]
//动态路由
const asyncRoutes = [
             {
                path:"/",
                name:"/",
                component:Index,
                meta:{
                    title:"后台首页",
                } 
            },
            {
                path:"/goods/list",
                name:"/goods/list",
                component:GoodList,
                meta:{
                    title:"商品管理",
                } 
            },
            {
                path:"/category/list",
                name:"/category/list",
                component:CategoryList,
                meta:{
                    title:"分类列表",
                } 
            }]

  
 export const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, 
  })

  //动态添加路由的方法
  export function addRoutes(menus){
    let hasNewRoutes = false
      const findAndAddRoutesByMenus =(arr)=>{
        
          arr.forEach(e => {
           
            let item = asyncRoutes.find(o=>o.path == e.frontpath)
            // console.log(item)
            if(item && !router.hasRoute(item.path)){
                // console.log(item)
                router.addRoute("admin",item)
                hasNewRoutes = true 
            }
            
            if(e.child && e.child.length > 0){
                findAndAddRoutesByMenus(e.child)
                //  console.log(e)
            }
        });
      }
      findAndAddRoutesByMenus(menus)
      return hasNewRoutes
  }

