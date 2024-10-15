document.getElementById('buscar').addEventListener('click', async function() {
    const busqueda = document.getElementById('busqueda').value;
    const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(busqueda)}`;

    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error('Error en la respuesta de la API');
        }

        const datos = await respuesta.json();
        mostrarResultados(datos);
    } catch (error) {
        console.error("Error:", error);
        document.getElementById('resultados').innerHTML = "Error al obtener resultados.";
    }
});

function mostrarResultados(imagenes) {
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = ''; // Limpiar resultados anteriores

    if (imagenes && imagenes.collection && imagenes.collection.items.length > 0) {
        imagenes.collection.items.forEach(item => {
            const titulo = item.data[0]?.title || 'Sin título';
            const descripcion = item.data[0]?.description || 'Sin descripción';
            const fecha = item.data[0]?.date_created || 'Sin fecha';
            const imagenUrl = item.links[0]?.href || '';

            resultadosDiv.innerHTML += `
                <div class="col-md-4">
                    <div class="card mb-4">
                        <img class="card-img-top" src="${imagenUrl}" alt="${titulo}">
                        <div class="card-body">
                            <h5 class="card-title">${titulo}</h5>
                            <p class="card-text">${descripcion}</p>
                            <p class="card-text"><small class="text-muted">Fecha: ${fecha}</small></p>
                            <a href="${imagenUrl}" class="btn btn-primary" target="_blank">Ver imagen</a>
                        </div>
                    </div>
                </div>
            `;
        });
    } else {
        resultadosDiv.innerHTML = "No se encontraron imágenes.";
    }
}