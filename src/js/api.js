// api.js
const API_URL = 'http://localhost/API-REST-PRUEBA/public/';

const api = {
    async getAllProducts() {
        const response = await fetch(API_URL, {
            method: 'GET'
        });
        return await response.json();
    },

    async getProductById(id) {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ id: id })
        });
        return await response.json();
    },

    async createProduct(product) {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                nombre: product.nombre,
                descripcion: product.descripcion,
                precio: product.precio
            })
        });
        return await response.json();
    },

    async updateProduct(product) {
        const response = await fetch(API_URL, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: product.id,
                nombre: product.nombre,
                descripcion: product.descripcion,
                precio: product.precio
            })
        });
        return await response.json();
    },

    async deleteProduct(id) {
        const response = await fetch(API_URL, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ id: id })
        });
        return await response.json();
    }
};