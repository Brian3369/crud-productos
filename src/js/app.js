// app.js
document.addEventListener('DOMContentLoaded', cargarProductos);
document.getElementById('productoForm').addEventListener('submit', guardarProducto);

async function cargarProductos() {
    try {
        const data = await api.getAllProducts();
        const tbody = document.getElementById('productosTabla');
        tbody.innerHTML = '';

        if (data.registros) {
            data.registros.forEach(producto => {
                tbody.innerHTML += `
                    <tr>
                        <td>${producto.id}</td>
                        <td>${producto.nombre}</td>
                        <td>${producto.descripcion}</td>
                        <td>${producto.precio}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="editarProducto(${JSON.stringify(producto).replace(/"/g, "'")})">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${producto.id})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function guardarProducto(e) {
    e.preventDefault();
    
    const producto = {
        nombre: document.getElementById('nombre').value,
        descripcion: document.getElementById('descripcion').value,
        precio: document.getElementById('precio').value
    };

    const productId = document.getElementById('productId').value;

    try {
        if (productId) {
            producto.id = productId;
            await api.updateProduct(producto);
        } else {
            await api.createProduct(producto);
        }
        
        limpiarFormulario();
        cargarProductos();
    } catch (error) {
        console.error('Error:', error);
    }
}

function editarProducto(producto) {
    document.getElementById('productId').value = producto.id;
    document.getElementById('nombre').value = producto.nombre;
    document.getElementById('descripcion').value = producto.descripcion;
    document.getElementById('precio').value = producto.precio;
}

async function eliminarProducto(id) {
    if (confirm('¿Está seguro de eliminar este producto?')) {
        try {
            await api.deleteProduct(id);
            cargarProductos();
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

function limpiarFormulario() {
    document.getElementById('productoForm').reset();
    document.getElementById('productId').value = '';
}