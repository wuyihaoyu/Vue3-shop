import {createStore } from 'vuex'
import { login,getinfo } from "~/api/manager"
import { setToken,removeToken } from '~/composables/auth'

// 创建一个新的 store 实例
const store = createStore({
  state () {
    return {
     user:{},
     asideWidth:"250px",
     menus:[],
     ruleName:[]

    }
  },
  mutations: {
   SET_USERINFO(state,user){
    state.user= user
   },
   handleAsideWidth(state){
    state.asideWidth = state.asideWidth =="250px" ? "64px" :"250px"
   },
   SET_MENUS(state,menus){
     state.menus = menus
   },
   SET_RULENAMES(state,ruleNames){
    state.ruleNames = ruleNames
   }
  },
  actions:{
    login({commit},{username,password}){
      return new Promise((resolve,reject)=>{
        login(username,password).then(res=>{
          setToken(res.token)
          resolve(res)

      }).catch(err=>reject(err))
      })
    },


    getinfo({commit}){
       return new Promise((resolve,reject)=>{
        getinfo().then((res)=>{
            commit('SET_USERINFO',res)
            commit('SET_MENUS',res.menus)
            commit('SET_RULENAMES',res.ruleNames)
            resolve(res)
        }).catch(err=>reject(err))
       })
    },


    logout({commit}){
      removeToken()
      
      commit("SET_USERINFO",{})

    }



  }
})

export default store