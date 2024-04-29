<template>
    <div>
        <form>
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="userInfo.name" />
            <label for="phone">Phone:</label>
            <input type="text" id="phone" v-model="userInfo.phone" />
            <button type="submit" @click="saveUserInfo">Save</button>
        </form>
    </div>
</template>

<script setup>
    import fetchBackend from '../helpers/fetchBackend'

    const userInfo = ref({
        name: '',
        phone: ''
    })

    const getUser = async () => {
        try {
            // Fetch user data from the backend
            const response = await fetchBackend({url:'/api/user',method:'GET'});

            return {
                name: response.message.name,
                phone: response.message.phone
            }
        } catch (e) {
            console.error(e);
            return {name:'', phone:''}
        }
    }
    
    userInfo.value = await getUser();

    const saveUserInfo = async (event) => {
        event.preventDefault();

        const {message} = await fetchBackend({url: '/api/user', body: {...userInfo.value}, method: 'put'});

        alert(message);
        
    }
    
</script>