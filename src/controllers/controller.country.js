
import csc from 'countries-states-cities';


const getDataCountries={
 
    getAllCountries:(req, res) => {
      try {
        const countries = csc.getAllCountries();
        res.json(countries);
      } catch (error) {
       
        console.error('Error fetching countries:', error.message); // Registro del mensaje de error
        res.status(500).json({ error: 'Error fetching countries' });
      }
    },
    getStatesByCountry: (req, res) => {
        const { countryCode } = req.params;
        const states = csc.getStatesOfCountry(countryCode).map(state => state.name);
        res.json(states);
    },
    getCitiesByState : (req, res) => {
        const { countryCode, stateCode } = req.params;
        const cities = csc.getCitiesOfState(countryCode, stateCode).map(city => city.name);
       
        res.json(cities);
    },
    getAreaCodesByCountry : (req, res) => {
      const { countryCode } = req.params;
      const country = csc.getCountryById(countryCode);
           
      if (country && country.phoneCode) {
          res.json({ phone_code: country.phone_code });
      } else {
          res.status(404).json({ message: 'Código de área no encontrado' });
      }
    }
    /* getPostalCodesByCity:(req, res) => {
        const { city } = req.params;
        const normalizedCity = postal.parser.parse_address(city).find(part => part.component === 'city');
        
        if (normalizedCity && postalCodesDB[normalizedCity.value]) {
          res.json(postalCodesDB[normalizedCity.value]);
        } else {
          res.status(404).json({ error: 'Códigos postales no encontrados' });
        }
      } */

};

export default getDataCountries;
