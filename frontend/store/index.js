import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
    state: () => ({
        loggedIn: false
    }),
    getters: {
        isLoggedIn() {
            return this.loggedIn;
        }
    },
    actions: {
        setLogin() {
            this.loggedIn = true;
        },
        setLogout(){
            this.loggedIn = false;
        }
    },
    persist: true
});