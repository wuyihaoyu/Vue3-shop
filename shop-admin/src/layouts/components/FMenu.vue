<template>
    <div class="f-menu" :style="{ width:$store.state.asideWidth}">
        <el-menu
        :default-active ="defaultActive"
        unique-opened
        :collapse="isCollapse"
        class="border-0"
        @select="handleSelect"
        :collapse-transition = "false"
      >
      <template v-for="item in asideMenus" :key="item.icon">
        <el-sub-menu v-if="item.child && item.child.length > 0" :index="item.name">
          <template #title>
            <el-icon>
                <component :is="item.icon">
                </component>
            </el-icon>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item v-for="(item2,index2) in item.child" :key="index2" :index="item2.frontpath">
            <el-icon>
            <component :is="item2.icon"></component>
        </el-icon>
          <span>{{ item2.name }}</span>
        </el-menu-item>
        </el-sub-menu>

        <el-menu-item v-else :index="item.frontpath">
          <el-icon>
            <component :is="item.icon"></component>
        </el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
            
        
      </template>
      </el-menu>
    </div>
</template>
<script setup>
import { useRouter,useRoute,onBeforeRouteUpdate} from 'vue-router';
import { computed,ref } from 'vue'
import { useStore } from 'vuex';

const route = useRoute() 
const defaultActive = ref(route.path)

onBeforeRouteUpdate((to,from)=>{
  defaultActive.value = to.path
})

const store = useStore()
const isCollapse = computed(()=>
    !(store.state.asideWidth == "250px")
)

const asideMenus =computed(()=>store.state.menus)


const router = useRouter()
const handleSelect=(e)=>{
    router.push(e)

}
</script>
<style>
.f-menu {
    transition: all 0.2s;
    top: 64px;
    bottom: 0px;
    left: 0px;
    overflow-y: auto;
    overflow-x:hidden;
    @apply shadow-md fixed bg-light-50;
}

.f-menu::-webkit-scrollbar{
  width: 0px;
}

/* .border-0{

} */
</style>