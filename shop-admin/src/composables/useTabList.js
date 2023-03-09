import { ref } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { useCookies } from "@vueuse/integrations/useCookies";
import {router } from "~/router"

export function useTabList(){
const cookie = useCookies();
const route = useRoute();

const activeTab = ref(route.path);
const tabList = ref([
  {
    title: "后台首页",
    path: "/",
  },
  {
    title: "商品管理",
    path: "/goods/list",
  },
]);

function addTab(tab) {
  let noTab = tabList.value.findIndex((t) => t.path == tab.path) == -1;
  if (noTab) {
    tabList.value.push(tab);
  }
  cookie.set("tabList", tabList.value);
}

function initTabList() {
  let tbs = cookie.get("tabList");
  if (tbs) {
    tabList.value = tbs;
  }
}

initTabList();

onBeforeRouteUpdate((to, from) => {
  activeTab.value = to.path;
  addTab({
    title: to.meta.title,
    path: to.path,
  });
});

const changeTab = (t) => {
  activeTab.value = t;
  router.push(t);
};

const removeTab = (t) => {
  let a = activeTab.value;
  let tabs = tabList.value;

  if (a == t) {
    tabs.forEach((tab, index) => {
      if (tab.path == t) {
        const nextTab = tabs[index + 1] || tabs[index - 1];
        if (nextTab) {
          a = nextTab.path;
        }
      }
    });
  }
  activeTab.value = a;
  tabList.value = tabList.value.filter((tab) => tab.path != t);
  cookie.set("tabList", tabList.value);
};

const handleClose = (c) => {
  if (c == "clearAll") {
    activeTab.value = "/";
    tabList.value = [
      {
        title: "后台首页",
        path: "/",
      },
    ];
  } else if (c == "clearOther") {
    tabList.value = tabList.value.filter(
      (tab) => tab.path == "/" || tab.path == activeTab.value
    );
  }
  cookie.set("tabList", tabList.value);
};

return{
    activeTab,
    tabList,
    changeTab,
    removeTab,
    handleClose
}
}