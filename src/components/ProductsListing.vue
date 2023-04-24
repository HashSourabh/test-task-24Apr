<template>
  <div class="w-full border">


    <h1 class="text-center py-2 bg-sky-600">
      {{headerTitle}}
    </h1>


    <div class="flex justify-around bg-slate-300 h-10 items-center" >
      <a v-for="filter in filters" :key="filter" @click="filterChange(filter)" class="cursor-pointer w-full h-full text-center" :class="filter === filterSelected ? 'bg-sky-600' : ''">
        {{filter}}
      </a>
      
    </div>

    <div class="p-3">
      <div class="" v-for="product in filteredProducts">
        <h5 class="text-md font-normal leading-normal"> Title</h5>
        <h3 class="text-sm font-normal text-slate-500">Sub Title</h3>

        <div class="border px-3 py-2 flex gap-2" :class="product.available ? '' : 'flex-row-reverse'">
          <div class="w-1/3" ><img :src="product?.imageURL"/></div>

          <div class="flex flex-wrap w-2/3">

            <div class="w-full flex flex-row justify-between">

              <h5 class="text-md font-normal leading-normal">{{product?.name}}</h5>
              <span class="text-slate-500" v-if="product.available">{{ dateConversion(product.releaseDate, 'DD.MM.YYYY')}}</span>
              
            </div>
            <div class="w-full text-slate-500">
              {{product?.description}}
            </div>
            <div class="w-full flex flex-row justify-between">

              <div v-if="product.available"><span>Preis: {{product?.price?.value}} {{product?.price?.currency}}</span></div>
              <div>
                <ion-icon name="star" class="text-yellow-300 visible" v-for="n in Math.floor(product.rating)"></ion-icon>
                <ion-icon :name="(i == 0 && product.rating - Math.floor(product.rating) >= 0.5 ) ? 'star-half' : 'star-outline'" class="text-yellow-300 visible" v-for="(n,i) in 5- Math.floor(product.rating)"></ion-icon>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import { ref, onBeforeMount } from "vue";

import moment from "moment";

export default {
  
  setup () {
    const filters = ref([]);
    const headerTitle = ref("");
    const products = ref([]);
    const filteredProducts = ref([]);
    const filterSelected = ref();
    onBeforeMount(() => {
      fetch('https://gist.githubusercontent.com/benfranke/c33280a8df5f4f9db2e63ad45cab26a4/raw/f3ad6c00ff520c2667305103d5705bcbb57a7778/products.json')
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        filters.value = data.filters
        headerTitle.value = data.header.headerTitle
        filteredProducts.value = data.products
        products.value = data.products
      })
      .catch(error => {
        console.error(error);
      })
    });
    return {
      filters, headerTitle, filteredProducts, filterSelected, products
    }
  },
  methods: {
    
    dateConversion(dateString, dateFormat) {
      return moment.unix(dateString).format(dateFormat);
    },
    filterChange(filterType) {
      this.filterSelected = filterType
      if(this.filterSelected == 'Alle'){
        this.filteredProducts = this.products
      }else if(this.filterSelected == 'Verfügbar' ){
        this.filteredProducts = this.products.filter(product => {
          return product.available
        })
      }else if(this.filterSelected == 'Vorgemerkt' ){
        this.filteredProducts = this.products.filter(product => {
          return product?.wishlist
        })
      }
    }
  }
}
</script>
