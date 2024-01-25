<template>
    <div class="containerSignup">
        <div class="row_signup">
            <div class="col_signup">
                <form action="" class="signupForm" @submit.prevent="handleSignup">

                    <h2 class="signupTitle">Signup</h2>

                    <div class="signupUserName">
                        <label for="userName_signup" class="userName_lable_signup">username</label> <br>
                        <input type="text" required="true"  autocomplete="username" id="userName_signup"
                            placeholder="username">
                    </div>

                    <div class="signupEmail">
                        <label for="email_signup" class="email_lable_signup">email</label><br>
                        <input type="email" required="true" id="email_signup" placeholder="email">
                    </div>


                    <div class="signupPassword">
                        <label for="password_signup">password</label><br>
                        <input :type="showPassord" required="true" autocomplete="new-password" id="password_signup"
                            placeholder="password">

                        <div class="SignupShowPassword">
                            <input type="checkbox" id="showPassword_signup" @click="passwordType">
                            <label for="showPassword_signup" id="showPassword_signup">show password</label>
                        </div>


                    </div>

                    <div class="signupErrMsg">
                        <span errMsg_signup v-if="errMsg">{{ errMsg }}</span>
                    </div>
                    <div class="signupBtn">
                        <button type="submit" class="button_signup">signup</button>
                    </div>

                    <div class="useAccount">
                        <router-link to="/" class="useAccount"> Login</router-link>
                    </div>

                </form>

                <div class="loading_signup" v-if="isLoading">
                    <Loading />
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Loading from './Loading.vue';
import route from '@/router';
import cookies from 'vue-cookie'


export default {
    name: "SignupVue",
    data() {
        return {
            user: {
                userName: '',
                email: '',
                password: ''
            },
            isLoading: false,
            errMsg: '',
            showPassord: 'password',
        };
    },


    methods: {
        passwordType() {
            if (this.showPassord == 'password') {
                this.showPassord = 'text'
            }
            else {
                this.showPassord = 'password'
            }
        },

        handleSignup() {

            this.isLoading = true
            try {
                axios.post('https://fakestoreapi.com/users/',
                    {
                        email: this.user.email,
                        username: this.user.userName,
                        password: this.user.password
                    }

                ).then(data => {
                    this.isLoading = false;
                    cookies.set('username',this.user.userName)
                    route.push('/home')
                    console.log(data.data)
                }).catch(err => {
                    this.isLoading = false;
                    this.errMsg="unable to signup"
                    console.log(err)
                })
            } catch (error) {
                this.isLoading = false
                alert("please signup later");
                console.log(error);
            }

        }

    },
    components: { Loading }
}

</script>


<style>

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

.col_signup{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 200px;

}

button.button_signup {
    padding: 5px 10px;
    color: black;
    border-radius: 3px;
    box-shadow: grey;
    border: none;
    background-color: rgb(111, 245, 111);
}

button.button_signup:hover {
    background-color: rgb(98, 98, 236);
    transition: .5s;
    color: #fff;
    box-shadow: rgb(125, 125, 233) 3px 1px;
    box-sizing: 40px;
    font-size: 15px;
}

.showPassword_signup {
    margin-top: 8px;
}
.signupTitile {
    display: flex;
    align-items: center;
    justify-content: center;
}

.useAccount:hover {
    color: blue;
}

.useAccount {
    color: rgb(18, 138, 236);
}

input:focus {
    outline: none;
    border-bottom-style: groove;
    border-bottom-color: rgb(32, 148, 243);
    background-color: #fff;
}

input {
    text-align: center;
    margin-top: 5px;
    border: none;

}
</style>
