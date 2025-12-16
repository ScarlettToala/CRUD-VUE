<script setup>
import { ref } from 'vue'
import { useFetch } from '@/composable/useFetch.js'

const url = ref('http://localhost:3000/products/api/products')

const { data: products, error, loading } = useFetch(url)
</script>

<template>
  <div>
    <p v-if="loading">Carregant...</p>
    <p v-if="error">{{ error }}</p>

    <ul v-if="products">
      <li v-for="p in products" :key="p.id">
        {{ p.name }} - {{ p.price }}
      </li>
    </ul>
  </div>
</template>
