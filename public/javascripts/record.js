console.log("record.js success");
window.addEventListener("load", () => {
    const getPaises = async () => {
        try {
            const response = await fetch("https://restcountries.com/v2/all");
            const result = await response.json();
            const paises = result.map((country) => {
                if(country.translations.es != undefined){
                    let item =  {
                        name : country.name,
                        es : country.translations.es
                    }
                    return item
                }
               
            } );
            paises.sort((a,b) => a['es'] > b['es'] ? 1 : -1)
            console.log(paises)

            $("country").innerHTML += `<option value="" selected hidden>Seleccione su país</option>`;

            paises.forEach((pais) => {
                $("country").innerHTML += `<option value=${pais.name}> ${pais.es} </option>`;
            });
        } catch (error) {
            console.log(error);
        }
    };
    //getPaises();

   /*  $("country").addEventListener("change", (e) => {

        const getPais = async () => {
            try {
                const response = await fetch(`https://restcountries.com/v2/name/${e.target.value}?fullText=true`);
                const result = await response.json();
                if(result[0]){
                    document.getElementById('prefijo').value = '+' + result[0].callingCodes[0];
                    document.querySelector('.prefijo').textContent = '+' + result[0].callingCodes[0];
                    document.getElementById('phone').classList.add('p-left')
                }
    
            } catch (error) {
                console.log(error);
            }
        }

        getPais();
       
    }); */
    $("country").addEventListener("change", (e) => {

        const getPais = async () => {
            try {
                const response = await fetch(`/apis/callingCodes/${e.target.value}`);
                const result = await response.json();
                    document.getElementById('prefijo').value = '+' + result.callingCode;
                    document.querySelector('.prefijo').textContent = '+' + result.callingCode;
                    document.getElementById('phone').classList.add('ps-5')

    
            } catch (error) {
                console.log(error);
            }
        }

        getPais();
       
    });
});
