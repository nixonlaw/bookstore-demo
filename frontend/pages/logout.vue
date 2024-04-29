<template>
    
</template>

<script setup>
    import { useMainStore } from '@/store/index';

    const pageLoaded = () => {
        // const bssessionid = useCookie('bssessionid');
        // bssessionid.value = null;

        // const connect_sid = useCookie('connect.sid');
        // connect.sid.value = null;

        const mainStore = useMainStore();
        mainStore.setLogout();
        return navigateTo('/');
    }


    // Function to be triggered when the page loads
    pageLoaded()

</script>