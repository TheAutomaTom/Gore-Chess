import { defineStore } from "pinia";
// import { useProjectState } from "./Project.state";

import { ref } from "vue";

//== Types/ Shared Models
// import type { Quark } from "../../../ipc-models/Quark";

export const useAppState = defineStore("AppState", () => {

  //== Dependant States
  // const Project$= useProjectState();


  //== Properties
  const IsLoading = ref(true);
  const IsScrolled = ref(false);


  return {
    // Prj$: Project$,
    IsLoading,
    IsScrolled
  };
});

