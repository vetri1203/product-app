<template>
    <NavBar />
    <h1>Home</h1>
    <div>welcome <b style="font-size: 25px;">{{ user.username }}</b></div>
</template>

<script>
import route from '@/router';
import cookies from 'vue-cookie'
import NavBar from './Navbar.vue';
import jwtDecode from 'vue-jwt-decode';
export default {

    name: "HomeApp",

    data() {
        return {
            user: {
                username: '',
                userToken:''
            }
        }
    },

    created() {
        if (!cookies.get('token')) {
            route.push('/');
        }
        
        this.user.userToken = cookies.get('token');
        this.user.username = (jwtDecode.decode(this.user.userToken)).user;
    },
    components: {
        NavBar,
    }
}

</script>
