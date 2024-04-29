<template>
  <nav>
    <ul>
      <li>
        <nuxt-link to="/">Home</nuxt-link>
      </li>
      <!-- <li>
        <nuxt-link to="/books">Books</nuxt-link>
      </li> -->
      <template v-if="!mainStore.loggedIn">
        <li >
          <nuxt-link to="/login">Login</nuxt-link>
        </li>
      </template>
      <template v-else>
        <li>
          <nuxt-link to="/user">My info</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/orders">My orders</nuxt-link>
        </li>
        <li>
          <a @click="logout">Logout</a>
        </li>
      </template>
    </ul>
  </nav>
</template>
  
<style>
  nav {
    background-color: #f2f2f2;
    padding: 10px;
  }
  
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  
  li {
    display: inline;
    margin-right: 10px;
  }
  
  a {
    text-decoration: none;
    color: #333;
  }

  a:hover{
    cursor: pointer;
    color: #666
  }
</style>

<script setup>
  import { useMainStore } from '@/store/index';
  import fetchBackend from '../helpers/fetchBackend'
  const mainStore = useMainStore();
  const logout = async() => {
    const {status, message} = await fetchBackend({url: '/api/logout', body: {}, method: 'POST'});
    console.log(status, message);

    mainStore.setLogout();
    navigateTo('/');
  }
</script>