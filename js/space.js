const userInput = document.getElementById('inputBuscar');
const btnBuscar = document.getElementById('btnBuscar');
const galeria = document.getElementById('contenedor');

const buscarImagenes = () => {
  const input = userInput.value;
  if (input === '') {
    alert('Por favor ingrese un termino');
    return;
  }

  const url = `https://images-api.nasa.gov/search?q=${input}`;
  
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Ocurrió un error');
      }
      return response.json();
    })
    .then(data => {
      galeria.innerHTML = '';

      const resultados = data.collection.items;
      if (resultados.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron resultados.</p>';
        return;
      }

      resultados.forEach(item => {
        const {title, description, date_created} = item.data[0];
        const img = item.links && item.links.length > 0 ? item.links[0].href : null;
        const dateObj = new Date(date_created);
        const formattedDate = dateObj.toLocaleDateString();

        const card = `
          <div class="col-md-4 my-3"> 
            <div class="card">
              ${img ? `<img src="${img}" class="card-img-top" alt="${title || 'Sin Título'}">` : ''}
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text" id="description">${description || 'Sin Descripción'}</p>
                <p class="card-text"><small class="text-muted">Fecha: ${formattedDate};</p>
              </div>
            </div>
          </div>
        `;

        galeria.innerHTML += card;

      });
    })
    .catch(error => {
      console.error('Ocurrió un error:', error);
      galeria.innerHTML = '<p>Ocurrió un error al realizar la búsqueda</p>';
    });
};

btnBuscar.addEventListener('click', buscarImagenes);