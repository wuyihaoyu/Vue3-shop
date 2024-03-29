import {createRouter,createWebHashHistory } from 'vue-router'
import Index from "~/pages/index.vue"
import Login from "~/pages/login.vue"
import NotFound from "~/pages/404.vue"
import Admin from "~/layouts/admin.vue"
import GoodList from "~/pages/goods/list.vue"

import CategoryList from "~/pages/category/list.vue"
import UserList from "~/pages/user/list.vue"
import OrderList from "~/pages/order/list.vue"
import CommentList from "~/pages/comment/list.vue"
import ImageList from "~/pages/image/list.vue"
import NoticeList from "~/pages/notice/list.vue"
import SettingBase from "~/pages/setting/base.vue"
import CouponList from "~/pages/coupon/list.vue"
import ManagerList from "~/pages/manager/list.vue"
import AccessList from "~/pages/access/list.vue"
import RoleList from "~/pages/role/list.vue"
import SkusList from "~/pages/skus/list.vue"

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
            },
            {
                path:"/user/list",
                name:"/user/list",
                component:UserList,
                meta:{
                    title:"用户列表",
                } 
            },
            {
                path:"/order/list",
                name:"/order/list",
                component:OrderList,
                meta:{
                    title:"订单列表",
                } 
            },   
            {
                path:"/comment/list",
                name:"/comment/list",
                component:CommentList,
                meta:{
                    title:"评价列表",
                } 
            },
            {
                path:"/image/list",
                name:"/image/list",
                component:ImageList,
                meta:{
                    title:"图库列表",
                } 
            },
            {
                path:"/notice/list",
                name:"/notice/list",
                component:NoticeList,
                meta:{
                    title:"公告列表",
                } 
            },
            {
                path:"/setting/base",
                name:"/setting/base",
                component:SettingBase,
                meta:{
                    title:"配置",
                } 
            }, {
                path:"/coupon/list",
                name:"/coupon/list",
                component:CouponList,
                meta:{
                    title:"优惠券列表",
                } 
            },{
                path:"/manager/list",
                name:"/manager/list",
                component:ManagerList,
                meta:{
                    title:"管理员",
                } 
            },{
                path:"/access/list",
                name:"/access/list",
                component:AccessList,
                meta:{
                    title:"菜单权限管理",
                } 
            },
            {
                path:"/role/list",
                name:"/role/list",
                component:RoleList,
                meta:{
                    title:"角色管理",
                } 
            },
            {
                path:"/skus/list",
                name:"/skus/list",
                component:SkusList,
                meta:{
                    title:"规格管理",
                } 
            }
        ]

  
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

