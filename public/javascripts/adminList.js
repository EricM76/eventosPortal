const confirmRemove = (e, form) => {
    e.preventDefault()
  
    Swal.fire({
        title: '¿Está seguro que deseas eliminar el administrador?',
        text: "¡Esto será irreversible!",
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