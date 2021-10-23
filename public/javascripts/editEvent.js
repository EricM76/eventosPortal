console.log("JS addEvent vinculado con éxito!");
const $ = (id) => document.getElementById(id);

const oneCapitalize = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

const oneMB = 1048576;
let regExExt = /(.jpg|.jpeg|.png|.gif|.webp)$/i;

const qs = new URLSearchParams(window.location.search);
let newLogos = [];



const removeLogos = async () => {
    let response = await fetch('/apis/logos/remove?id='+qs.get('event'));
    let result = await response.json();
    console.log(result)
}

window.addEventListener("load", () => {
    
  const getLogos = async () => {
    localStorage.removeItem('newLogos');
    let response = await fetch('/apis/logos?id='+qs.get('event'));
    let result = await response.json();
    console.log(result)
    if(result.logos.length > 0){
        result.logos.forEach(e => {
            let logo = {
                name : e.name,
                src : '/images/events/' + e.name
            }
            newLogos.push(logo)
        });
        $('btn-logos').style.display = 'none';
        $('btn-remove-logos').style.display = 'block';

/*         logos = "true"; 
 */
        localStorage.setItem('newLogos',JSON.stringify(newLogos));
        logos = 'true';
            createIframe()
    }else{
        $('btn-logos').style.display = 'block';
    }
}

   
   

  $("btn-preview").setAttribute("hidden", "true");

  if (screen.width < 1280) {
    $("btn-preview").setAttribute("hidden", "true");
  } else {
    $("btn-preview").removeAttribute("hidden");
  }

  $("selectModality").addEventListener("change", (e) => {
    if (e.target.value == "virtual") {
      $("boxLink").removeAttribute("hidden");
      $("boxPlataform").removeAttribute("hidden");
      $("boxLocation").setAttribute("hidden", "true");
    } else if (e.target.value == "presencial") {
      $("boxLocation").removeAttribute("hidden");
      $("boxLink").setAttribute("hidden", "true");
      $("boxPlataform").setAttribute("hidden", "true");
    }
  });

  switch ($("selectModality").value) {
    case "virtual":
      $("boxLink").removeAttribute("hidden");
      $("boxPlataform").removeAttribute("hidden");
      $("boxLocation").setAttribute("hidden", "true");
      break;
    case "presencial":
      $("boxLocation").removeAttribute("hidden");
      $("boxLink").setAttribute("hidden", "true");
      $("boxPlataform").setAttribute("hidden", "true");
      break;
    default:
      break;
  }

  $("logos").addEventListener("change", (e) => {
    prevLogos.innerHTML = "";
    localStorage.removeItem("newLogos");
    logos = "false";

    var preview = $("prevLogos");

    if (e.target.files.length == 0) {
      e.target.files.value = null;
      $("btn-logos").style.display = "block";
      $("btn-remove-all").style.display = "block";
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
        preview.innerHTML += `
        <img class='mx-2' src='${this.result}' alt="logo" width=100>
        `;

        newLogos.push({
          name: file.name,
          src: this.result,
        });
        localStorage.setItem("newLogos", JSON.stringify(newLogos));

        logos = "true";
        createIframe();
        $("btn-logos").style.display = "none";
        $("btn-remove-logos").style.display = "block";
      });

      reader.readAsDataURL(file);
    }
  });

  $('btn-remove-logos').addEventListener('click',(e) => {
    e.preventDefault()
    confirmRemove()
   
})

const confirmRemove = () => {

    Swal.fire({
        title: '¿Estás seguro que desea eliminar los logos?',
        text: "¡Luego no podrás revertir los cambios!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminalos',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            $('logos').files.value = null;
            $('btn-remove-logos').style.display = 'none';
            $('prevLogos').innerHTML = "";
            $('logosSave').innerHTML = "";
            removeLogos();
            $("btn-logos").style.display = "block";
            newLogos = [];
            localStorage.removeItem('newLogos');
            logos = 'false';
            createIframe()
        }
    })
}

  var data = {};

  var colorPrimary = $("inputColorPrimary").getAttribute("value").slice(1);

  var title = $("inputEvent").value;
  var subtitle = $("inputSubTitle").value;
  var speaker = $("inputSpeaker").value;
  var date = $("inputDate").value;
  var description = $("inputDescription").value;
  var plataform = $("inputPlataform").value;
  var ubiety = $("inputLocation").value;

  $("inputEvent").addEventListener("change", (e) => {
    title = e.target.value;
    createIframe();
  });

  $("inputSubTitle").addEventListener("change", (e) => {
    subtitle = e.target.value;
    createIframe();
  });

  $("inputSpeaker").addEventListener("change", (e) => {
    speaker = e.target.value;
    createIframe();
  });

  $("inputDate").addEventListener("change", (e) => {
    date = e.target.value;
    createIframe();
  });

  $("inputDescription").addEventListener("change", (e) => {
    description = e.target.value;
    createIframe();
  });

  $("inputPlataform").addEventListener("change", (e) => {
    if (($("selectModality").value = "virtual")) {
      plataform = e.target.value;
      createIframe();
    }
  });

  $("inputLocation").addEventListener("change", (e) => {
    if (($("selectModality").value = "presencial")) {
      ubiety = e.target.value;
      createIframe();
    }
  });

  $("selectModality").addEventListener("change", (e) => {
    if (e.target.value == "virtual") {
      $("inputLocation").value = "";
      ubiety = undefined;
      createIframe();
    } else if (e.target.value == "presencial") {
      $("inputPlataform").value = "";
      $("inputConnection").value = "";
      plataform = undefined;
      createIframe();
    }
  });

  $("inputColorPrimary").addEventListener("change", (e) => {
    colorPrimary = e.target.value.slice(1);
    createIframe();
  });

  $('btn-preview').addEventListener('click', (e) => {
       logos = 'true';
       createIframe()
})

  function createIframe() {
    $("iframe-sm").setAttribute(
      "src",
      `/records/form/preview?colorPrimary=${colorPrimary}&title=${title}&&subtitle=${subtitle}&&description=${description}&&speaker=${speaker}&&plataform=${plataform}&&location=${ubiety}&&date=${date}&&logos=${logos}`
    );
    $("iframe-md").setAttribute(
      "src",
      `/records/form/preview?colorPrimary=${colorPrimary}&title=${title}&&subtitle=${subtitle}&&description=${description}&&speaker=${speaker}&&plataform=${plataform}&&location=${ubiety}&&date=${date}&&logos=${logos}`
    );
    $("iframe-lg").setAttribute(
      "src",
      `/records/form/preview?colorPrimary=${colorPrimary}&title=${title}&&subtitle=${subtitle}&&description=${description}&&speaker=${speaker}&&plataform=${plataform}&&location=${ubiety}&&date=${date}&&logos=${logos}`
    );
  }
  getLogos()

  createIframe();
});
