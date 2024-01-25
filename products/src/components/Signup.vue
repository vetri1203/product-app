<template>
    <div>
        <h2>Signup vue</h2>
        <button type="submit" @click="user">check</button>
    </div>
</template>

<script>

export default {
    name: "SignupVue",
    data() {
        return {
            name:this.token
        }
    },
    props: {
        token:String,
    },

    created() {
        
          console.log(this.$route.params.token);
        
    },
    
}

</script>
