<template>
  <el-aside width="220px" class="image-aside" v-loading="loading">
    <div class="top">
      <AsideList
        :active="activeId == item.id"
        v-for="(item, index) in list"
        :key="index"
        @edit="handleEdit(item)"
        @delete="handleDelete(item.id)"
        @click="handleChangeActiveId(item.id)"
        >{{ item.name }}</AsideList
      >
    </div>
    <div class="bottom">
      <el-pagination
        background
        layout="prev, next"
        :total="total"
        :current-page="currentPage"
        :page-size="limit"
        @current-change="getData"
      />
    </div>
  </el-aside>

  <FormDrawer :title="drawerTitle" ref="formDrawerRef" @submit="handleSubmit">
    <el-form
      :model="form"
      ref="formRef"
      :rules="rules"
      label-width="80px"
      :inline="false"
    >
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="排序" prop="order">
        <el-input-number
          v-model="form.order"
          :min="0"
          :max="1000"
        ></el-input-number>
      </el-form-item>
    </el-form>
  </FormDrawer>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import AsideList from "~/components/AsideList.vue";
import {
  getImageClassList,
  createImageClass,
  updateImageClass,
  deleteImageClass,
} from "~/api/image_class.js";
import FormDrawer from "./FormDrawer.vue";
import { toast } from "~/composables/util.js";

const loading = ref(false);
const list = ref([]);

const activeId = ref(0);

//分页
const currentPage = ref(1);
const total = ref(0);
const limit = ref(10);

const editId = ref(0);
const drawerTitle = computed(() => (editId.value ? "修改" : "新增"));

function getData(p = null) {
  if (typeof p == "number") {
    currentPage.value = p;
  }

  loading.value = true;
  getImageClassList(currentPage.value)
    .then((res) => {
      total.value = res.totalCount;
      list.value = res.list;
      let item = list.value[0];
      if (item) {
        handleChangeActiveId(item.id);
      }
    })
    .finally(() => {
      loading.value = false;
    });
}

getData();

const formDrawerRef = ref(null);

const handleCreate = () => {
  editId.value = 0;
  form.name = "";
  form.order = 50;
  formDrawerRef.value.open();
};

const form = reactive({
  name: "",
  order: 50,
});

const formRef = ref(null);

const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) return;
    formDrawerRef.value.showLoading();
    const fun = editId.value
      ? updateImageClass(editId.value, form)
      : createImageClass(form);

    fun
      .then((res) => {
        toast(drawerTitle.value + "成功");
        getData(editId.value ? currentPage.value : 1);
        formDrawerRef.value.close();
      })
      .finally(() => {
        formDrawerRef.value.hideLoading();
      });
  });
};

const rules = {
  name: [
    {
      required: true,
      message: "图库分类不能为空",
      trigger: "blur",
    },
  ],
};

const handleEdit = (row) => {
  editId.value = row.id;
  form.name = row.name;
  form.order = row.order;
  formDrawerRef.value.open();
};

const handleDelete = (id) => {
  loading.value = true;
  deleteImageClass(id)
    .then((res) => {
      toast("删除成功");
      getData();
    })
    .finally(() => {
      loading.value = false;
    });
};

//选中图库分类id
const emit = defineEmits(["change"]);
function handleChangeActiveId(id) {
  activeId.value = id;
  emit("change", id);
}

defineExpose({
  handleCreate,
});
</script>

<style>
.image-aside {
  border-right: 1px solid #eeeeee;
  position: relative;
}

.image-aside .top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}

.image-aside .bottom {
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex items-center justify-center;
}
</style>