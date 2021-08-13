
import { Router } from 'express';
import admin from './admin';
import car from './car';

const routes = Router();
routes.use("/admin/", admin);
routes.use("/cars/", car);

export default routes;