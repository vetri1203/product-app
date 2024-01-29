<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <form @submit.prevent="userUpdate">
                    <div class="username">
                        <img class="profileIm" src="./image/profileIcon.png" alt="">
                        <h2>{{ userDetails.userName }}</h2>
                    </div>
    
                    <div class="ProfileEmail">
                        <label for="emailProfile">email : </label> <br>
                        <input type="email" id="emailProfile" v-model="userDetails.email" class="email-profile" placeholder="email *" required="true">
                    </div>
                    <div class="ProfileUserName">
                        <label for="userNameProfile">username : </label> <br>
                        <input type="text" id="userNameProfile" v-model="userDetails.userName" class="username-profile" placeholder="username *" required="true">
                    </div>
                    <div class="ProfilePhone">
                        <label for="phoneProfile">phone number : </label> <br>
                        <input type="tel" id="phoneProfile" v-model="userDetails.phone" class="phone-profile" placeholder="phone number *" required="true">
                    </div>
                    <div class="profilePassword">
                        <label for="passwordProfile"> password : </label> <br>
                        <input :type="user.showType" id="passwordProfile" v-model="userDetails.password" class="password-profile" placeholder="password *" required="true">
    
    
                        <div class="profileShowPassword">
                            <input type="checkbox" id="showPassword-profile" @click="ShowPassword"> <label for="showPassword-profile">show password</label>
                        </div>
                    </div>
    
                    <div class="ProfileAddress">
                        <div class="ProfileCity">
                            <label for="cityProfile">city : </label> <br>
                            <input type="text" id="cityProfile" v-model="userDetails.address.city" class="city-profile" placeholder="city *" required="true">
                        </div>
    
                        <div class="Profilestreet">
                            <label for="streetProfile">street : </label> <br>
                            <input type="text" id="streetProfile" v-model="userDetails.address.street" class="street-profile" placeholder="street *" required="true">
                        </div>
    
                        <div class="profileZip">
                            <label for="zipProfile">zip-code : </label> <br>
                            <input type="text" id="zipProfile" v-model="userDetails.address.zipcode" class="zip-profile" placeholder="zip-code *" required="true">
                        </div>
                    </div>
    
                    <div class="profileUpdateBtn">
                        <button type="submit" class="udate-profile">update</button>
                    </div>
    
                    <div class="homelink">
                        <router-link to="/home">Home</router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import cookies from 'vue-cookie';
import jwtDecode from 'vue-jwt-decode'
import axios from 'axios';

export default {

    name: 'ProfilePage',

    data() {
        return {
            user: {
                userName: '',
                userToken: '',
                userId: '',

                showType: 'password',
            },
            userDetails: {
                email: '',
                userName: '',
                phone: '',
                password: '',
                address: {
                    city: '',
                    street: '',
                    zipcode: '',
                }
            }

        }
    },
    methods: {

        ShowPassword() {
            if (this.user.showType == 'password') {
                this.user.showType = 'text';
            } else {
                this.user.showType = 'password'
            }
        },

        async userUpdate() {
            console.log(this.userDetails.email);

            axios.put(`https://fakestoreapi.com/users/${this.user.userId}`, {
                email: this.userDetails.email,
                username: this.userDetails.userName,
                password: this.userDetails.password,
            }).then((res) => {
                console.log(res.data);
            })

            alert('updated')
            this.$router.push('/home');

        }
    },

    async created() {
        this.userToken = cookies.get('token');
        this.userName = (jwtDecode.decode(this.userToken)).user;
        this.user.userId = (jwtDecode.decode(this.userToken)).sub;
        try {
            await axios.get(`https://fakestoreapi.com/users/${this.user.userId}`)
                .then((data) => {
                    this.userDetails.email = data.data.email;
                    this.userDetails.phone = data.data.phone,
                        this.userDetails.password = data.data.password;
                    this.userDetails.userName = data.data.username;
                    // address
                    this.userDetails.address.city = data.data.address.city;
                    this.userDetails.address.street = data.data.address.street;
                    this.userDetails.address.zipcode = data.data.address.zipcode;
                })
                .catch(e => console.warn(e));
        } catch (error) {
            console.warn(error);
        }

        console.log(this.userDetails.address);

    },






}
</script>

<style>
.udate-profile {
    padding: 5px 10px;
    color: black;
    border-radius: 3px;
    box-shadow: grey;
    border: none;
    background-color: rgb(111, 245, 111);
    cursor: pointer;
}

.udate-profile:hover {
    background-color: rgb(98, 98, 236);
    transition: .5s;
    color: #fff;
    box-shadow: rgb(125, 125, 233) 3px 1px;
    box-sizing: 40px;
    font-size: 15px;
}

.profileIm {
    height: 50px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    cursor: not-allowed;
}
</style>