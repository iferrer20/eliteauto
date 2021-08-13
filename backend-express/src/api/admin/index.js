import { Router } from 'express';
import car from './car';

const routes = Router();

routes.use("/car/", car);
// routes.get("/", (req, res) => {
//     res.jsonp({
//         "a":1
//     });
// });

export default routes;