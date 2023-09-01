<script lang="ts" setup>
import { onMounted } from "vue";
import { useAppState } from "./state/App.state";
// import router from "./infra/router";
import { /* IPC Methods */ } from "#preload";
const app$ = useAppState();
function handleScroll() { app$.IsScrolled = window.scrollY > 0; }

onMounted( async () => {
  // Internal Scroll Listener...
  window.addEventListener("scroll", handleScroll);

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

});
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>
