const $ = (id) => document.getElementById(id);
const colActivity = document.querySelectorAll('.col-activity');
const colInscription = document.querySelectorAll('.col-inscription');
const colDate = document.querySelectorAll('.col-date');

const params = new URLSearchParams(window.location.search);

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: false,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

function copiarAlPortapapeles(id_elemento) {

  // Crea un campo de texto "oculto"
  var aux = document.createElement("input");

  // Asigna el contenido del elemento especificado al valor del campo
  aux.setAttribute("value", document.getElementById(id_elemento).innerText);

  // Añade el campo a la página
  document.body.appendChild(aux);

  // Selecciona el contenido del campo
  aux.select();

  // Copia el texto seleccionado
  document.execCommand("copy");

  // Elimina el campo de la página
  document.body.removeChild(aux);

  Toast.fire({
    icon: 'success',
    title: 'Link copiado en el portapapeles'
  })
}

async function changeActive(id)  {
  let value;
  document.getElementById('active').checked ? value = 1 : value = 0
  response = await fetch('/apis/active/'+id,{
      method: 'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body:JSON.stringify({
          id,
          active : value
      })
  });
  result = await response.json();
  console.log(result);
}

if(params.get('event') && params.get('event') == "success"){
  Toast.fire({
    icon: 'success',
    title: 'Evento creado con éxito'
  })
}

window.addEventListener('load', () => {

  switch (true) {
    case screen.width < 768:
      colActivity.forEach(col => col.style.display = "none");
      colInscription.forEach(col => col.style.display = "none");
      colDate.forEach(col => col.style.display = "none");
      break;

    case screen.width < 1024:
      colActivity.forEach(col => col.style.display = "none");
      colInscription.forEach(col => col.style.display = "none");
      break;

    default:
      colActivity.forEach(col => col.style.display = "table-cell");
      colInscription.forEach(col => col.style.display = "table-cell");
      colDate.forEach(col => col.style.display = "table-cell");
      break;
  }

  $('activity').addEventListener('change', () => {
    $('formFilter').submit()
  })

  $('order').addEventListener('change', () => {
    $('formOrder').submit()
  })

  $('formSearch').addEventListener('submit', (e) => {
    console.log($('search'))
    e.preventDefault()
    if ($('search').value.trim() != "") {
      $('formSearch').submit();
    }
  })

  document.getElementById('btn-download').addEventListener('click', () => {

    Toast.fire({
      icon: 'success',
      title: 'Descarga en proceso...'
    })
  })

  document.getElementById('btn-informe').addEventListener('click', () => {

    Toast.fire({
      icon: 'success',
      title: 'Descarga en proceso...'
    })
  })

})