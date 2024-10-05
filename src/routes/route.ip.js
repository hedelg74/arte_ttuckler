// routes/ipRoutes.js
import express from 'express';
import controllerIp from '../controllers/controller.ip.js';

const router = express.Router();

router.get('/ip', controllerIp.getClientIP);
router.get('/geo/:ip', controllerIp.getGeoInfo);

export default  router;
