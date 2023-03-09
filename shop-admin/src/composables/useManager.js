import { ref, reactive } from "vue";
import { logout, updatedpassword } from "~/api/manager";
import { showMoldal, toast } from "~/composables/util";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export function useRespassword() {
  const store = useStore();
  const router = useRouter();
  const formDrawerRef = ref(null);
  const form = reactive({
    oldpassword: "",
    password: "",
    repassword: "",
  });

  const rules = {
    oldpassword: [
      {
        required: true,
        message: "旧密码不能为空",
        trigger: "blur",
      },
    ],
    password: [
      {
        required: true,
        message: "密码不能为空",
        trigger: "blur",
      },
    ],
    repassword: [
      {
        required: true,
        message: "密码不能为空",
        trigger: "blur",
      },
    ],
  };

  const formRef = ref(null);
  const onSubmit = () => {
    formRef.value.validate((valid) => {
      if (!valid) {
        return false;
      }

      // loading.value = true;
      formDrawerRef.value.showLoading();
      updatedpassword(form)
        .then((res) => {
          toast("修改密码成功，请重新登录");
          //清除当前用户状态
          store.dispatch("logout");
          //跳转回登录页
          router.push("/login");
        })
        .finally(() => {
          // loading.value=false
          formDrawerRef.value.hideLoading();
        });
    });
  };

  const openRePasswordForm=()=>{
    formDrawerRef.value.open();
  }

  return{
    formDrawerRef,
    form,
    rules,
    formRef,
    onSubmit,
    openRePasswordForm
    
  }
}

export function useLogout(){

    const store = useStore();
    const router = useRouter();

    function handleLogout() {
        showMoldal("是否要退出登录？").then((res) => {
          console.log("退出登录");
          logout().finally((res) => {
            //移除cookie tooken
      
            //清除当前用户状态
            store.dispatch("logout");
            //跳转回登录页
            router.push("/login");
      
            //提示退出成功
            toast("退出登录成功");
          });
        });
      }

      return {
        handleLogout
      }
}