import {defineStore} from "pinia";

const useAppStore = defineStore('app',{
    state:()=>({
        isDev:import.meta.env.DEV
    }),
    getters:{},
    actions:{}
})
 export default useAppStore
