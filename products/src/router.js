import { createRouter, createWebHistory } from "vue-router";

import HomeApp from './components/Home';
import NotFound from './components/PageNotFound'

const routes = [
    {
        path: '/',
        name: "Home",
        component:HomeApp
        
    },

    {
        path: '/404',
        name: "NotFound",
        component:NotFound
    },
    {
        path: '/:catchAll(.*)',
        redirect:'/404'
    }
    
]

const route = createRouter({
    history: createWebHistory(),
    routes,
});


export default route;