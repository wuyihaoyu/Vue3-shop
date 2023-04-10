<template>
  <div v-if="modelValue">
    <el-image v-if="typeof modelValue == 'string'" :src="modelValue" fit="cover"
      class="w-[100px] h-[100px] rounded border mr-2"></el-image>
    <div v-else class="flex flex-wrap">
      <div class="relative mx-1 mb-2 w-[100px] h-[100px]" v-for="(url, index) in modelValue" :key="index">
        <el-icon @click="removeImage(url)" class="absolute right-[5px] top-[5px] cursor-pointer bg-white rounded-full"
          style="z-index: 10;">
          <CircleClose />
        </el-icon>
        <el-image :src="url" fit="cover" class="w-[100px] h-[100px] rounded border mr-2"></el-image>
      </div>
    </div>
  </div>

  <div class="choose-image-btn" @click="open">
    <el-icon :size="25" class="text-gray-500">
      <Plus />
    </el-icon>
  </div>
  <el-dialog title="选择图片" v-model="dialogVisible" width="80%" top="5vh">
    <el-container class="bg-white rounded" style="height: 70vh">
      <el-header class="image-header">
        <el-button type="primary" size="small" @click="handleOpenCreate">
          新增图片分类
        </el-button>
        <el-button type="warning" size="small" @click="handleOpenUpload">
          上传图片
        </el-button>
      </el-header>
      <el-container>
        <ImageAside ref="ImageAsideRef" @change="handleAsideChange" />
        <ImageMain ref="ImageMainRef" @choose="handleChoose" openChoose />
      </el-container>
    </el-container>
    <template #footer>
      <span>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from "vue";

import ImageAside from "~/components/ImageAside.vue";
import ImageMain from "~/components/ImageMain.vue";

const open = () => {
  dialogVisible.value = true;
};

const close = () => {
  dialogVisible.value = false;
};

const ImageAsideRef = ref(null);
const handleOpenCreate = () => {
  ImageAsideRef.value.handleCreate();
};

const ImageMainRef = ref(null);

const handleAsideChange = (image_class_id) => {
  ImageMainRef.value.loadData(image_class_id);
};

const handleOpenUpload = () => {
  ImageMainRef.value.openUploadFile();
};

const dialogVisible = ref(false);
const submit = () => {
  if (urls.length) {
    emit("update:modelValue", urls[0]);
  }
  close();
};

const props = defineProps({
  modelValue: [String, Array],
});

const emit = defineEmits(["update:modelValue"]);

let urls = [];
const handleChoose = (e) => {
  urls = e.map((o) => o.url);
};

const removeImage = (url) => {
  emit("update:modelValue", props.modelValue.filter(u => u != url))
}
</script>
<style>
.choose-image-btn {
  @apply w-[100px] h-[100px] rounded border flex justify-center items-center cursor-pointer hover: (bg-gray-100);
}

.image-header {
  border-bottom: 1px solid #eeeeee;
  @apply flex items-center;
}
</style>