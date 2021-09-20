
import { Router } from 'express';
import admin from './admin';
import car from './car';
import message from './message';

const routes = Router();
routes.use("/admin/", admin);
routes.use("/car/", car);
routes.use("/message/", message);

export default routes;