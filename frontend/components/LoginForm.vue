<template>
    <form @submit="login">
        <div>
        <label for="username">username:</label>
        <input type="username" id="username" v-model="username">
        </div>
        <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password">
        </div>
        <button type="submit">Login</button>
    </form>
</template>

<script>
    import { useMainStore } from '@/store/index';
    import fetchBackend from '../helpers/fetchBackend'
    const mainStore = useMainStore();
    export default {
        data() {
            return {
                username: '',
                password: ''
            };
        },
        methods: {
            async login(event) {
                event.preventDefault();

                try {

                    const {username, password} = this;

                    const {status, message} = await fetchBackend({url: '/api/login', body: {username, password}, method: 'POST'});

                    if(status===200){
                        mainStore.setLogin();
                        navigateTo('/')
                    }else{
                        alert(message);
                    }

                } catch (error) {
                    // Handle the error
                    console.error(error);
                }
            }
        }
    };
</script>