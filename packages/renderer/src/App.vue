<template>
  <div
    class="app-wrapper"
    :class="orientation"
  >
    <div class="header-wrapper">
      <div>W:{{ windowWidth }} >= H:{{ windowHeight }} ? {{ orientation }}</div>
    </div>

    <div class="router-wrapper">
      <router-view />
    </div>

    <div class="footer-wrapper">
      <p>Footer Placeholder</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useAppState } from "./state/App.state";
// import router from "./infra/router";
import { /* IPC Methods */ } from "#preload";
const app$ = useAppState();
function handleScroll() { app$.IsScrolled = window.scrollY > 0; }


const handleResize = (): void => {
  windowWidth.value = window.outerWidth;
  windowHeight.value = window.outerHeight;
};

const windowWidth = ref( window.innerWidth );
const windowHeight = ref( window.innerHeight );
const orientation = computed(() => windowWidth.value >= windowHeight.value ? "landscape-orientation" : "portrait-orientation");

onMounted( async () => {
  // Internal Scroll Listener...
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleResize);

  /* IPC EXAMPLES...
  /// Inbound App Menu commands...
  // window.addEventListener("DOMContentLoaded", () => { OnLoadProjectFile((_: unknown, value: Project) =>
  //   { app$.Prj$.LoadProjectFile(value); router.push(Paths.routeOnProjectLoad); }); });
  // window.addEventListener("DOMContentLoaded", async () =>
  // { OnSaveProjectFile((_: unknown, filePath: string) =>
  //   { HandleSaveProjectFile(filePath, JSON.stringify(app$.Prj$.Project, null, 2)); }); });

  /// Inbound Context commands...
  //  window.addEventListener("DOMContentLoaded", () => { OnCopyRow((_: unknown, _any: unknown)         => { app$.Prj$.OnCopyRow();    }); });
  //  window.addEventListener("DOMContentLoaded", () => { OnNavigateTo((_: unknown, route: string)      => { router.push(`/${route}`); }); });

  /// Inbound Sql commands...
  // window.addEventListener("DOMContentLoaded", () => {
  //   OnRefreshQuarkBook((_: unknown, value: Quark[])    => {
  //     console.log("[App.vue] OnRefreshQuarkBook()...");
  //     console.dir(value);
  //     app$.OnRefreshQuarkBook(value);
  //   });
  // });
  */

}); //... OnMounted




</script>

<style scoped lang="scss">
.app-wrapper {
  position: fixed; left:0; top:0; right:0; bottom:0;
  background-color: burlywood;
}
.header-wrapper {
  top:0;
  height: 10vh;
  width: 100%;

}

// .landscape-orientation {
// }
// .portrait-orientation {
// }
.router-wrapper {
  position: relative;
  height: 400px;
}

.footer-wrapper {
  position: fixed;
  bottom:0;
  height: 1em;
}

</style>
