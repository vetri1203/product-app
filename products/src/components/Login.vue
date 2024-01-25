<template>
    <div class="container_login">

        <div class="row_login">
            <div class="col_login">
                <form action="" @submit.prevent="LoginHandle()">

                    <h2 class="loginTitile">Login</h2>

                    <div class="LoginuserName">
                        <label for="userName_login">username</label> <br>
                        <input type="text" id="userName_login" autocomplete="on" required="true" placeholder="username *"
                            v-model="user.userName">
                    </div>
                    <div class="LginPassword">

                        <label for="password_login">Password</label> <br>
                        <input :type="isShow" id="password_login" autocomplete="on" required="true" placeholder="Password *"
                            v-model="user.password" @copy.prevent>

                        <div class="LoginShowPassword">

                            <input type="checkbox" @click="showClick" class="showPassword_login" id="showPassword_login">
                            <label for="showPassword_login" class="showPassword_lable_login">show password</label>
                        </div>

                    </div>

                    <div class="erMsg">
                        <span class="msg_login" v-if="errMsg" style="color: red;">{{ errMsg }}</span>
                    </div>

                    <div class="loginButton">
                        <button type="submit" class="button_login">Login</button>
                    </div>

                    <div class="noAccount">
                        <router-link to="/signup" class="noAccount">signup</router-link>
                    </div>


                </form>

                <div class="loading_login" v-if="isloading">
                    <Loading class="loading_login" />
                </div>

            </div>
        </div>

    </div>
</template>


<script>

import axios from 'axios';
import Loading from './Loading.vue'
import route from '@/router';

export default {
    name: "LoginVue",
    data() {
        return {
            user: {
                userName: '',
                password: ''
            },
            isloading: false,
            isShow: 'password',
            errMsg: '',
            userToken: '',
            borderColoer: 'none'
        };
    },
    methods: {
        showClick() {
            if (this.isShow == "password") {
                this.isShow = "text";
            }
            else {
                this.isShow = "password";
            }
        },
        LoginHandle() {
            this.isloading = true;
            this.errMsg = '';
            try {
                axios.post('https://fakestoreapi.com/auth/login', {
                    username: this.user.userName,
                    password: this.user.password
                })
                    .then((data) => {
                        this.isloading = false;
                        this.userToken = data.data.token;
                        if (data.status === 200) {
                            route.push({ path: '/home',  })
                        }
                    })
                    .catch(() => {
                        this.isloading = false;
                        this.errMsg = 'check your username or password'
                    }
                    );
            }
            catch (error) {
                alert("something went worng!")
                this.user.userName = '';
                this.user.password = '';
                this.isloading = false;
                console.warn(error);


            }
        },


    },
    components: {
        Loading
    }
}

</script>

<style scoped>
div.col_login {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 200px;

}

input {
    text-align: center;
    margin-top: 5px;
    border: none;

}

input:focus {
    outline: none;
    border-bottom-style: groove;
    border-bottom-color: rgb(32, 148, 243);
    background-color: #fff;
}

form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 25px 80px;
    border-radius: 2px;
    font-size: 18px;
    background-color: aliceblue;
    background-image: './image/loading.gif';
}

.noAccount {
    color: rgb(18, 138, 236);
}

.noAccount:hover {
    color: blue;
}


h2.loginTitile {
    display: flex;
    align-items: center;
    justify-content: center;
}

button.button_login {
    padding: 5px 10px;
    color: black;
    border-radius: 3px;
    box-shadow: grey;
    border: none;
    background-color: rgb(111, 245, 111);
}

button.button_login:hover {
    background-color: rgb(98, 98, 236);
    transition: .5s;
    color: #fff;
    box-shadow: rgb(125, 125, 233) 3px 1px;
    box-sizing: 40px;
    font-size: 15px;
}


.LoginShowPassword {
    margin-top: 8px;
}
</style>
