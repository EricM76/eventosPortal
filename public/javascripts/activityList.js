function editOn(e, id) {
  e.preventDefault();
  document.getElementById(`form-edit${id}`).style.display = "block";
  document.getElementById(`btn-name${id}`).style.display = "none";
  document.getElementById(`btn-edit${id}`).classList.toggle("disabled");
  document.getElementById(`input-edit${id}`).focus();

}

function editOff(e, id) {
  e.preventDefault();
  document.getElementById(`form-edit${id}`).style.display = "none";
  document.getElementById(`btn-name${id}`).style.display = "flex";
  document.getElementById(`btn-edit${id}`).classList.toggle("disabled");
}

function addOn(e){
    e.preventDefault()
    document.getElementById('btn-add').style.display = "none";
    document.getElementById('form-search').style.display = "none";
    document.getElementById('form-add').style.display = 'block';
}

function addOn1(e){
  e.preventDefault()
  document.getElementById('btn-add').style.display = "none";
  document.getElementById('form-add').style.display = 'block';
}

function addOff(){
    document.getElementById('btn-add').style.display = "block";
    document.getElementById('form-search').style.display = "block";
    document.getElementById('form-add').style.display = 'none';
}

function addOff1(){
  document.getElementById('btn-add').style.display = "block";
  document.getElementById('form-add').style.display = 'none';
}

const confirmRemove = (e, form) => {
  e.preventDefault()

  Swal.fire({
      title: '¿Está seguro que deseas eliminar la actividad?',
      text: "¡Se eliminarán todos los eventos vinculados!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo',
      cancelButtonText: 'Cancelar'
  }).then((result) => {
      if (result.isConfirmed) {
          form.submit()
      }
  })
}