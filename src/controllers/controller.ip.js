import fetch from 'node-fetch';

const getClientIP = (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    res.json({ ip });
};

const getGeoInfo = async (req, res) => {
    const ip = req.params.ip;
    const apiUrl = `https://api.bigdatacloud.net/data/ip-geolocation?ip=${ip}&key=bdc_787077fbff9e422fba3209db39ed98c5`;

    try {
        const response = await fetch(apiUrl);

        // Verificar si la respuesta fue exitosa
        if (!response.ok) {
            const errorDetails = await response.text(); // Obtener detalles del error
            console.error('Error de la API:', response.status, errorDetails);
            return res.status(response.status).json({ error: 'Error al obtener la información geográfica', details: errorDetails });
        }

        // Procesar la respuesta como antes
        const data = await response.json();

        return res.json(data);
    } catch (error) {
        console.error('Error al obtener la información geográfica:', error);
        return res.status(500).json({ error: 'Error al obtener la información geográfica' });
    }
};
    /* const ip = req.params.ip;
    try {
        //186.151.108.146
        //ilocation pk.8357270050ec7893d984f88698400779
        const response = await fetch(`https://api.bigdatacloud.net/data/ip-geolocation?ip=${ip}&key=bdc_787077fbff9e422fba3209db39ed98c5`);
      //const response = await fetch(`https://api.ipapi.com/api/${ip}?access_key=YOUR_ACCESS_KEY`);
        //const response = await fetch(`https://ipinfo.io/${ip}/json?token=ebc47a961f73b5`);
        //const response = await fetch(`http://ip-api.com/json/${ip}`);
        console.log(response);
        if (!response.ok) {
            throw new Error(`Error en la API: ${response.statusText}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error al obtener información geográfica:', error);
        res.status(500).json({ error: 'Error al obtener información geográfica' });
    }
}; */

export default {getClientIP, getGeoInfo};
