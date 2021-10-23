console.log("validationFormRecord.js success");

$('name').addEventListener('blur', () => {
    switch (true) {
        case !$('name').value:
            $('name').classList.add('is-invalid')
            break
        default:
            $('name').classList.remove('is-invalid');
    }
})

$('surname').addEventListener('blur', () => {
    switch (true) {
        case !$('surname').value:
            $('surname').classList.add('is-invalid')
            break
        default:
            $('surname').classList.remove('is-invalid');
    }
})

$('genre').addEventListener('blur', () => {
    switch (true) {
        case !$('genre').value:
            $('genre').classList.add('is-invalid')
            break
        default:
            $('genre').classList.remove('is-invalid');
    }
})

$('birthday').addEventListener('blur', () => {
    switch (true) {
        case !$('birthday').value:
            $('birthday').classList.add('is-invalid')
            break
        default:
            $('birthday').classList.remove('is-invalid');
    }
})

$('email').addEventListener('blur', () => {
    switch (true) {
        case !$('email').value:
            $('email').classList.add('is-invalid')
            break
        default:
            $('email').classList.remove('is-invalid');
    }
})

$('phone').addEventListener('blur', () => {
    switch (true) {
        case !$('phone').value:
            $('phone').classList.add('is-invalid')
            break
        default:
            $('phone').classList.remove('is-invalid');
    }
})

$('country').addEventListener('blur', () => {
    switch (true) {
        case !$('country').value:
            $('country').classList.add('is-invalid')
            break
        default:
            $('country').classList.remove('is-invalid');
    }
})

$('state').addEventListener('blur', () => {
    switch (true) {
        case !$('state').value:
            $('state').classList.add('is-invalid')
            break
        default:
            $('state').classList.remove('is-invalid');
    }
})

$('city').addEventListener('blur', () => {
    switch (true) {
        case !$('city').value:
            $('city').classList.add('is-invalid')
            break
        default:
            $('city').classList.remove('is-invalid');
    }
})

$('formRecord').addEventListener('submit', (e) => {
    e.preventDefault()
    let completed = true;
    let elements = $('formRecord').elements;
    const validator = (id) => {
        $(id).classList.add('is-invalid');
    }
    !$('name').value ? validator('name') : null
    !$('surname').value ? validator('surname') : null
    !$('genre').value ? validator('genre') : null
    !$('birthday').value ? validator('birthday') : null
    !$('email').value ? validator('email') : null
    !$('phone').value ? validator('phone') : null
    !$('country').value ? validator('country') : null
    !$('state').value ? validator('state') : null
    !$('city').value ? validator('city') : null


    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.contains('is-invalid') ? completed = false : null;
    }

    completed ? $('formRecord').submit() : null

})