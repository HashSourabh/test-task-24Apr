import { createRouter, createWebHistory } from 'vue-router'
import ProductsListing from '../components/ProductsListing.vue'

const routes = [
    {
        path: '/',
        name: 'ProductsListing',
        component: ProductsListing
    },
    
]

const router = createRouter({ history: createWebHistory(), routes })
export default router