import { onMounted, ref, watch } from 'vue'

export function useFetchCRUD(url) {

    const data = ref(null)
    const error = ref(null)
    const loading = ref(false)

    const fetchData = async () => {
        loading.value = true
        error.value = null

        try {
            const res = await fetch(url.value, { credentials: 'include' })
            if (!res.ok) throw new Error(`Error en la petición: ${res.status}`)
            data.value = await res.json()
        } catch (err) {
            error.value = err.message
        } finally {
            loading.value = false
        }
    }

    //le hace llega un nuevo objeto
    const createData = async (newItem) => {
        try {
            //Hacemos la petición Http, en este caso es el endpoint de mi backend
            const res = await fetch(url.value, {
                method: 'POST', //estamos haciendo una petición para crear un recurso.
                headers: { 'Content-Type': 'application/json' }, //le decimos al backend que le estamos enviando JSON.
                body: JSON.stringify(newItem), //→ convertimos el objeto newItem en cadena JSON, porque fetch solo puede enviar texto.
                credentials: 'include' //envía cookies con la petición (útil si tu backend usa sesiones o JWT en cookies).
            })
            if (!res.ok) throw new Error(`Error al crear: ${res.status}`)
            await fetchData() // refresca la lista
        } catch (err) {
            error.value = err.message
        }
    }

    const updateData = async (id, updatedItem) => {
        try {
            const res = await fetch(`${url.value}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedItem),
                credentials: 'include'
            })
            if (!res.ok) throw new Error(`Error al actualizar: ${res.status}`)
            await fetchData() // refresca la lista
        } catch (err) {
            error.value = err.message
        }
    }

    const deleteData = async (id) => {
        try {
            const res = await fetch(`${url.value}/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            })
            if (!res.ok) throw new Error(`Error al eliminar: ${res.status}`)
            await fetchData() // refresca la lista
        } catch (err) {
            error.value = err.message
        }
    }

    onMounted(fetchData)
    watch(url, fetchData)

    return { data, error, loading, fetchData, createData, updateData, deleteData }
}
