document.addEventListener('DOMContentLoaded', () => {



    function getLocationByIp(){
        async function getClientIP() {
            const response = await fetch('/api/ip');
            const data = await response.json();
            return data.ip;
        }

        async function getGeoInfo(ip) {
            const response = await fetch(`/api/geo/${ip}`);
            const data = await response.json();
            return data;
        }


        getClientIP().then(ip => {
            console.log(`La dirección IP del cliente es: ${ip}`);
            return getGeoInfo(ip);
        }).then(data => {
            if (data) {
                document.querySelector('#country').value = data.country.name;
                //document.querySelector('#phone-number').value ="+" + data.country.callingCode;
                //const flagUrl = `https://flagcdn.com/${data.countryCode.toLowerCase()}.png`;
                //const banderaImg = document.getElementById('bandera');
                //banderaImg.src = flagUrl;
                //banderaImg.style.display = 'block'; // Mostrar la imagen
                console.log(data);

            } else {
                console.error('No se pudo obtener la información de la IP.');
            };
        }).catch(error => {
                console.error('Error en la promesa:', error);
            });


    };


    getLocationByIp();

});

