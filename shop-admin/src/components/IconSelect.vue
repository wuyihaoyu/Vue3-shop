<template>
  <div class="flex items-center items-center">
    <el-icon v-if="modelValue" :size="20">
      <component :is="modelValue" />
    </el-icon>
    <el-select
      filterable
      :modelValue="modelValue"
      class="m-2"
      placeholder="请选择图标"
      @change="handleChange"
    >
      <el-option v-for="item in icons" :key="item" :label="item" :value="item">
        <div class="flex items-center justify-between">
          <el-icon>
            <component :is="item" />
          </el-icon>
          <span class="text-gray-500">{{ item }}</span>
        </div>
      </el-option>
    </el-select>
  </div>
</template>

<script setup>
import { ref } from "vue";
import * as iconList from "@element-plus/icons-vue";
defineProps({
  modelValue: String,
});
console.log(Object.keys(iconList));
const icons = ref(Object.keys(iconList));

const emit = defineEmits(["update:modelValue"]);
const handleChange = (icon) => {
  emit("update:modelValue", icon);
};
</script>