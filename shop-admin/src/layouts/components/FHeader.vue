<template>
  <div>
  <div class="f-header">
    <span class="logo">
      <el-icon class="mr-1"><eleme-filled /></el-icon>
      帝莎编程
    </span>

    <el-icon class="icon-btn" @click="$store.commit('handleAsideWidth')">
      <fold v-if="$store.state.asideWidth == '250px'" />
      <Expand v-else />
    </el-icon>

    <el-tooltip effect="dark" content="刷新" placement="bottom">
      <el-icon class="icon-btn" @click="handleRefresh">
        <refresh />
      </el-icon>
    </el-tooltip>

    <div class="ml-auto flex items-center">
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <el-icon class="icon-btn" @click="toggle">
          <full-screen v-if="!isFullscreen" />
          <aim v-else></aim>
        </el-icon>
      </el-tooltip>

      <el-dropdown class="dropdown" @command="handleCommand">
        <span class="flex items-center text-light-50">
          <el-avatar
            class="mr-2"
            :size="25"
            :src="$store.state.user.avatar"
          ></el-avatar>
          {{ $store.state.user.username }}
          <el-icon class="el-icon--right">
            <arrow-down></arrow-down>
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword"> 修改密码 </el-dropdown-item>
            <el-dropdown-item command="logout"> 退出登录 </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <form-drawer
    ref="formDrawerRef"
    title="修改密码"
    destroyOnClose
    @submit="onSubmit"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="formRef"
      label-width="80px"
      size="small"
    >
      <el-form-item prop="oldpassword" label="旧密码">
        <el-input v-model="form.oldpassword" placeholder="请输入旧密码">
        </el-input>
      </el-form-item>
      <el-form-item prop="password" label="新密码">
        <el-input
          v-model="form.password"
          placeholder="请输入密码"
          type="password"
          show-password
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="repassword" label="确认密码">
        <el-input
          v-model="form.repassword"
          placeholder="请输入确认新密码"
          type="password"
          show-password
        >
        </el-input>
      </el-form-item>
    </el-form>
  </form-drawer>
</div>
</template>

<script setup>
import FormDrawer from "~/components/FormDrawer.vue";

import { useFullscreen } from "@vueuse/core";
import { useRespassword, useLogout } from "~/composables/useManager";

import { ref, reactive } from "vue";
const showDrawer = ref(false);

const { isFullscreen, toggle } = useFullscreen();
const { formDrawerRef, form, rules, formRef, onSubmit, openRePasswordForm } =
  useRespassword();

const { handleLogout } = useLogout();

const handleCommand = (c) => {
  switch (c) {
    case "logout":
      handleLogout();
      break;
    case "rePassword":
      // showDrawer.value = true;
      openRePasswordForm();
      break;
  }
};

const handleRefresh = () => {
  location.reload();
};
</script>

<style>
.f-header {
  @apply flex items-center bg-indigo-700 text-light-50 fixed top-0 left-0 right-0;
  height: 64px;
  z-index: 1000;
}

.logo {
  @apply flex justify-center items-center text-xl font-thin;
  width: 250px;
}

.icon-btn {
  @apply flex justify-center items-center;
  width: 42px;
  height: 64px;
  cursor: pointer;
}

.icon-btn:hover {
  @apply bg-indigo-600;
}

.f-header .dropdown {
  height: 64px;
  cursor: pointer;
  @apply flex justify-center items-center mx-5;
}
</style>