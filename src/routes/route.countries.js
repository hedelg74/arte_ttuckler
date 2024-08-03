import express from 'express';
import controllerDataCountry from '../controllers/controller.country.js';

const routerCountry=express.Router();

routerCountry.get('/countries',controllerDataCountry.getAllCountries);
routerCountry.get('/states/:countryCode',controllerDataCountry.getStatesByCountry);
routerCountry.get('/cities/:countryCode/:stateCode',controllerDataCountry.getCitiesByState);
//routerCountry.get('/postal-codes/:city',controllerDataCountry.getPostalCodesByCity);
routerCountry.get('/area-codes/:countryCode',controllerDataCountry.getAreaCodesByCountry);

export default routerCountry;
