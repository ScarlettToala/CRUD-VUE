<script setup>
import { ref } from 'vue'
import { useFetchCRUD } from '@/composable/useFetchCRUD.js'

const url = ref('http://localhost:3000/api/products')
const { data: products, createData, updateData, deleteData, loading, error } = useFetchCRUD(url)

const newProduct = ref({ name: '', price: '', category: '' })

const addProduct = async () => {
  await createData(newProduct.value)
  newProduct.value = { name: '', price: '', category: '' } // reset
}

//Todo esto es para editar los productos

const editingProduct = ref(null)

const startEditProduct = (product) => {
  editingProduct.value = { ...product }  // copia el producto
  newProduct.value = { ...product }      // llena el formulario con los datos
}

const saveEditProduct = async () => {
  await editProduct(editingProduct.value.id, newProduct.value)
  newProduct.value = { name: '', price: '', category: '' } // limpiar
  editingProduct.value = null
}

const cancelEdit = () => {
  editingProduct.value = null
  newProduct.value = { name: '', price: '', category: '' } // limpiar formulario
}


const editProduct = async (id, updatedItem) => {
  await updateData(id, updatedItem)
}

const removeProduct = async (id) => {
  if (confirm('Eliminar producto?')) {
    await deleteData(id)
  }
}
</script>


<template>
  <div v-if="loading">Cargando...</div>
  <div v-if="error">{{ error }}</div>

  <ul>
    <li v-for="p in products" :key="p.id">
      {{ p.name }} - {{ p.price }} - {{ p.category }}
      <button @click="startEditProduct(p)">Editar</button>
      <button @click="removeProduct(p.id)">Eliminar</button>
    </li>
  </ul>

  <h3>{{ editingProduct ? 'Editar producto' : 'Crear producto' }}</h3>
  <input v-model="newProduct.name" placeholder="Nombre" />
  <input v-model="newProduct.price" placeholder="Precio" />
  <input v-model="newProduct.category" placeholder="Categoría" />
  <button @click="editingProduct ? saveEditProduct() : addProduct()">
    {{ editingProduct ? 'Actualizar' : 'Crear' }}
  </button>

  <button v-if="editingProduct" @click="cancelEdit">Cancelar</button>

</template>


<style scoped>
/* Contenedor general */
div {
  max-width: 600px;
  margin: 2rem auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

/* Mensajes de carga o error */
div[v-if="loading"], div[v-if="error"] {
  text-align: center;
  margin-bottom: 1rem;
  font-weight: bold;
}

div[v-if="error"] {
  color: #e74c3c;
}

/* Lista de productos */
ul {
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

li button {
  margin-left: 0.5rem;
}

/* Botones generales */
button {
  cursor: pointer;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-weight: 500;
  transition: background 0.2s;
}

button:hover {
  opacity: 0.9;
}

/* Botones específicos */
button:first-of-type {
  background-color: #3498db;
  color: #fff;
}

button:first-of-type:hover {
  background-color: #2980b9;
}

button:last-of-type {
  background-color: #e74c3c;
  color: #fff;
}

button:last-of-type:hover {
  background-color: #c0392b;
}

/* Formulario */
h3 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  color: #2c3e50;
}

input {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
  transition: border 0.2s;
}

input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 3px #3498db;
}

/* Botón de crear/actualizar */
button:nth-of-type(3) {
  background-color: #2ecc71;
  color: #fff;
  width: 100%;
  margin-bottom: 0.5rem;
}

button:nth-of-type(3):hover {
  background-color: #27ae60;
}

/* Botón de cancelar */
button[v-if="editingProduct"] {
  background-color: #95a5a6;
  color: #fff;
  width: 100%;
}

button[v-if="editingProduct"]:hover {
  background-color: #7f8c8d;
}
</style>
