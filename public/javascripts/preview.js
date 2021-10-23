const $ = id => document.getElementById(id)

window.addEventListener('load', () => {

    const params = new URLSearchParams(window.location.search);
    $('title').style.color = '#' + params.get('colorPrimary');
    $('subtitle').style.color = '#' + params.get('colorPrimary');
    $('box-form').style.backgroundColor = '#' + params.get('colorPrimary');
    $('box-form').style.color = '#' + params.get('colorText');
    $('date').style.backgroundColor = '#' + params.get('colorPrimary');
    $('date').style.color = '#' + params.get('colorText');
    $('btn-form').style.backgroundColor = '#' + params.get('colorBack');
    document.body.style.backgroundColor = '#' + params.get('colorBack');

    const semana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
    const meses = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const date = new Date(params.get('date'));
    const fecha = date.getDate().toString().length == 1 ? '0' + date.getDate() : date.getDate();
    const dia = semana[date.getDay()];
    const mes = meses[date.getMonth()];
    const hora = date.getHours().toString().length == 1 ? '0' + date.getHours() : date.getHours();
    const minutos = date.getMinutes().length == 1 ? '0' + date.getMinutes() : date.getMinutes();


    if (params.get('date') != 'undefined') {
        $('dia').textContent = dia;
        $('fecha').textContent = fecha;
        $('mes').textContent = mes;
        $('hora').textContent = hora;
    }

    if (params.get('title') != 'undefined' && params.get('title').trim().length != 0) {
        $('title').textContent = params.get('title');
    } else {
        $('title').textContent = "Escuelas para crecer";
    }

    if (params.get('subtitle') != 'undefined' && params.get('subtitle').trim().length != 0) {
        $('subtitle').textContent = params.get('subtitle');
    } else {
        $('subtitle').textContent = "Escuela Kiriat Hajinuj/Rejovot";
    }

    if (params.get('description') != 'undefined' && params.get('description').trim().length != 0) {
        $('description').textContent = params.get('description');
    } else {
        $('description').textContent = "Conocé instituciones para que tus hijos estudien en Israel. Conocé metodologías, opciones y diferentes directores que cuentan la experiencia en primera persona."
    }

    if (params.get('speaker') != 'undefined' && params.get('speaker').trim().length != 0) {
        $('box-speaker').style.display = 'block';
        $('speaker').textContent = params.get('speaker');

    } else {
        $('box-speaker').style.display = 'none';
    }

    if (params.get('plataform') != 'undefined' && params.get('plataform').trim().length != 0) {
        $('box-plataform').style.display = 'block';
        $('plataform').textContent = params.get('plataform');
        $('box-location').style.display = 'none';
    }
    if (params.get('location') != 'undefined' && params.get('location').trim().length != 0) {
        $('box-location').style.display = 'block';
        $('box-plataform').style.display = 'none';
        $('location').textContent = params.get('location');
    }

    if (params.get('logos') != 'undefined' && params.get('logos') == 'true') {
        var images = JSON.parse(localStorage.getItem('newLogos'))
        images.forEach(image => {
            $('box-logos').innerHTML += (`<img class='mx-4' src='${image.src}' alt="logo" height="80" >`);
        });
    }
})