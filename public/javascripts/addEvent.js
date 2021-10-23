
console.log("JS addEvent vinculado con éxito!");
const $ = (id) => document.getElementById(id);

const oneCapitalize = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

const oneMB = 1048576;
let regExExt = /(.jpg|.jpeg|.png|.gif|.webp)$/i;


window.addEventListener("load", () => {

localStorage.removeItem('newLogos');
$('btn-preview').setAttribute('hidden','true');

if(screen.width < 1280){
    $('btn-preview').setAttribute('hidden','true')
}else{
    $('btn-preview').removeAttribute('hidden')
}

$("selectModality").addEventListener("change", e => {
    if (e.target.value == "virtual") {
        $("boxLink").removeAttribute('hidden');
        $("boxPlataform").removeAttribute('hidden');
        $("boxLocation").setAttribute('hidden','true');
        $('inputLocation').value = null;
    }else if(e.target.value == "presencial"){
        $("boxLocation").removeAttribute('hidden');
        $("boxLink").setAttribute('hidden','true');
        $("boxPlataform").setAttribute('hidden','true');
        $('inputPlataform').value = null;
    }
})

  $("logos").addEventListener("change", e => {
    prevLogos.innerHTML = "";
    localStorage.removeItem('newLogos');
    logos = 'false';
    var preview = $("prevLogos");
    var newLogos = [];

    if(e.target.files.length == 0){
        e.target.files.value = null;
        $('btn-logos').innerHTML = "Subir logos";
        $('btn-remove-logos').style.display = 'none';
    }

    [].forEach.call(e.target.files, readAndPreview);
    function readAndPreview(file) {
      // Make sure `file.name` matches our extensions criteria
      if (!/\.(jpe?g|png|gif|webp)$/i.test(file.name)) {
        $("logosError").innerHTML =
          "Solo imágenes con extensión jpg, jpeg, png, gif, webp";
        $("logos").classList.add("is-invalid");
        prevLogos.innerHTML = "";
        return null;
      } // else...
      $("logos").classList.remove("is-invalid");
      $("logos").classList.add("is-valid");
      $("logosError").innerHTML = "";
      var reader = new FileReader();
      reader.addEventListener("load", function () {

        newLogos.push({
            name : file.name,
            src: this.result
        });
        localStorage.setItem('newLogos',JSON.stringify(newLogos));

        preview.innerHTML += (`
        <div style="width: 100px;" id=${file.name}>
        <img class='mx-2 img-fluid' src='${this.result}' alt="logo">
        </div>
        `);

        logos = 'true';
        createIframe()
        $('btn-logos').innerHTML = "Cambiar logos";
        $('btn-remove-logos').style.display = 'block';
      });
      
      reader.readAsDataURL(file);

    }
    
    if(preview.innerHTML == ""){
        $("logos").classList.remove("is-valid");
    }
  });

$('btn-remove-logos').addEventListener('click',(e) => {
    e.preventDefault()
    $('logos').files.value = null;
    $('btn-logos').innerHTML = "Subir logos";
    e.target.style.display = 'none';
    prevLogos.innerHTML = "";
    localStorage.removeItem('newLogos');
    logos = 'false';
    createIframe()

})

var data = {};

var colorPrimary = $('inputColorPrimary').getAttribute('value').slice(1);

var title;
var subtitle;
var speaker;
var date;
var description;
var plataform;
var ubiety;
var logos;


$('inputEvent').addEventListener('change', (e)=>{
    if(e.target.value != ""){
        title= e.target.value;
        createIframe()
    }
    
})

$('inputSubTitle').addEventListener('change', (e)=>{
    subtitle = e.target.value;
    createIframe()
})

$('inputSpeaker').addEventListener('change', (e)=>{
    speaker = e.target.value;
    createIframe()
})

$('inputDate').addEventListener('change', (e)=>{
    date = e.target.value;
    createIframe()
})

$('inputDescription').addEventListener('change', (e)=>{
    description = e.target.value;
    createIframe()
})

$('inputPlataform').addEventListener('change', (e)=>{
    if($('selectModality').value = "virtual"){
        plataform = e.target.value;
        ubiety = undefined;
        createIframe()
    }
})

$('inputLocation').addEventListener('change', (e)=>{
    if($('selectModality').value = "presencial"){
        ubiety = e.target.value;
        plataform = undefined;
        createIframe()
    }
})

$("selectModality").addEventListener("change", e => {
    if (e.target.value == "virtual") {
        ubiety = undefined;
        createIframe()
    }else if(e.target.value == "presencial"){
        plataform = undefined;
        createIframe()
    }
})

$('inputColorPrimary').addEventListener('change',(e)=>{
    colorPrimary = e.target.value.slice(1);
    createIframe()
})

$('btn-preview').addEventListener('click', (e) => {
    if (localStorage.getItem('newLogos')) {
       logos = 'true';
       createIframe()
    }
})

function createIframe(){
    $('iframe-sm').setAttribute('src', `/records/form/preview?colorPrimary=${colorPrimary}&title=${title}&&subtitle=${subtitle}&&description=${description}&&speaker=${speaker}&&plataform=${plataform}&&location=${ubiety}&&date=${date}&&logos=${logos}`)
    $('iframe-md').setAttribute('src', `/records/form/preview?colorPrimary=${colorPrimary}&title=${title}&&subtitle=${subtitle}&&description=${description}&&speaker=${speaker}&&plataform=${plataform}&&location=${ubiety}&&date=${date}&&logos=${logos}`)
    $('iframe-lg').setAttribute('src', `/records/form/preview?colorPrimary=${colorPrimary}&title=${title}&&subtitle=${subtitle}&&description=${description}&&speaker=${speaker}&&plataform=${plataform}&&location=${ubiety}&&date=${date}&&logos=${logos}`)
}

createIframe()
});
