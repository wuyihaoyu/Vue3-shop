<template>
  <el-row class="min-h-screen bg-indigo-500">
    <el-col :lg="16"  :md="12"   class="flex  items-center justify-center">
    <div>
        <div class="font-bold text-5xl text-light-50 mb-4" >欢迎光临</div>
        <div class="text-gray-200 text-sm ">此站点是演示地址！。。 。。。。。。。。联系我</div>
    </div>
    </el-col>
    <el-col :lg="8"  :md="12" class="bg-light-50 flex items-center justify-center flex-col">
    <h2 class="font-bold text-3xl text-gray-800">欢迎回来</h2>
    <div class="flex items-center justify-center my-5 text-gray-300 space-x-2">
        <span class="h-[1px] w-16 bg-gray-200"></span>
        <span>账号密码登录</span>
        <span class="h-[1px] w-16 bg-gray-200"></span>
    </div>
    <el-form :model="form" style="w-[250px]" :rules="rules" ref="formRef">
        <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名">
                      <template #prefix>
                            <el-icon >
                                 <user/>
                            </el-icon>
                      </template>
            </el-input>
        </el-form-item>
        <el-form-item  prop="password">
            <el-input v-model="form.password" placeholder="请输入密码" type="password" show-password>
              <template #prefix>
                      <el-icon >
                              <lock/>
                      </el-icon>
               </template>
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button round class="w-[250px]" color="#626aef" type="primary" @click="onSubmit" :loading="loading">登 录</el-button>
        </el-form-item>
    </el-form>
    </el-col>
  
  
  </el-row>
</template>

<script setup>
      import {  reactive,ref,onMounted,onBeforeMount} from 'vue'
      import { User,Lock   } from "@element-plus/icons-vue"
     
      import { toast} from '~/composables/util'
      import { useRouter} from 'vue-router'

      import { useStore} from 'vuex'

      const store = useStore()
      const router = useRouter()

      const form = reactive({ 
        username:"",
        password:""

      })

      const rules = {
        username:[
          {
          required:true,
          message:'用户名不能为空',
          trigger:"blur"
         }
        ],
        password:[
        {
          required:true,
          message:'密码不能为空',
          trigger:"blur"
         }
        ]
      }

      const formRef = ref(null)
      const loading = ref(false)


      const onSubmit=()=>{
        formRef.value.validate((valid)=>{
            if(!valid){
              return false
            }

            loading.value = true

            store.dispatch("login",form).then(
              res=>{
                toast("登录成功")
                router.push("/")
              }).finally(()=>{
                loading.value = false
              })


            console.log("验证通过")
        })
      }

   function onKeyUp(e){
    if(e.key=="Enter"){
         onSubmit()
    }
   }
    
   onMounted(()=>{
      document.addEventListener("keyup",onKeyUp)
   })   
   
   onBeforeMount(()=>{
      document.removeEventListener("keyup",onKeyUp) 
   })

       

</script>