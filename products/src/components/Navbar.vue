<template>
    <nav>
        <div class="right">
            <div class="col-nav">
                <img class="profileImg" src="../components/image/profileIcon.png" alt="profile" @click="HandleProfile">
            </div>
        </div>
    </nav>
</template>

<script>

export default {
    name: 'NavBar',

    methods: {
        HandleProfile(){
            this.$router.push('/profile');
            
        }
    }
}
</script>


<style>
.profileImg {
    height: 50px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    background-color: #fff;
}

.col-nav {
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    background-color: rgb(248, 49, 49);
    padding-right: 10px;
    padding: 5px;
    width: 100% auto;
    margin-bottom: 10px;

}
</style>