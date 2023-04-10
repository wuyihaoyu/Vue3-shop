<template >
    <el-drawer title="设置轮播图" v-model="dialogVisible" size="50%" :destroy-on-close="true">
        <el-form :model="form"   label-width="80px" >
            <el-form-item label="轮播图">
                <ChooseImage v-model="form.banners">
                
                </ChooseImage>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
        
    </el-drawer>
</template>

<script setup>
import { ref,reactive } from "vue"
import ChooseImage from "~/components/ChooseImage.vue"

const dialogVisible = ref(false)

const form = reactive({
    banners:[]
})
</script>