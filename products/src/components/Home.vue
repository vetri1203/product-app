<template>
    <h1>Home</h1>

    <div>welcome <b style="font-size: 25px;">{{ user.username }}</b></div>
</template>

<script>
import route from '@/router';
import cookies from 'vue-cookie'

export default {

    name: "HomeApp",

    data() {
        return {
            user: {
                username: '',
            }
        }
    },

    created() {
        if (!cookies.get('username'))
        {
            route.push('/');
        }
        this.user.username = cookies.get('username');
    }
}

</script>
