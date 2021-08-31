import { Router } from 'express';
import { asyncHandler, RequestException } from '../../exception';
import pool from '../../db-pool';

const routes = Router();

function checkCar(car) {
    if (!(
        car.brand &&
        car.model &&
        car.km &&
        car.price &&
        car.discount &&
        car.engine &&
        car.horsepower && 
        car.fuel &&
        car.transmission &&
        car.year &&
        car.color)
    ) {
        throw new RequestException(400, "Some car values are empty");
    }
}
routes.put("/", asyncHandler(async (req, res) => {
    let car = req.body;

    checkCar(car);

    await pool.query("SELECT NEW_CAR(($1, $2::VARCHAR(64), $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)::CAR)", [
        car.brand,
        car.model,
        car.km,
        car.price,
        car.discount,
        car.engine,
        car.horsepower,
        car.fuel,
        car.transmission,
        car.year,
        car.color,
        car.sold
    ]);

    res.jsonp({
        status: "ok"
    });
    
}));

routes.post("/", asyncHandler(async (req, res) => { // Modify
    let car = req.body;

    checkCar(car);

    await pool.query("SELECT UPDATE_CAR($1, ($2, $3::VARCHAR(64), $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)::CAR)", [
        car.id,
        car.brand,
        car.model,
        car.km,
        car.price,
        car.discount,
        car.engine,
        car.horsepower,
        car.fuel,
        car.transmission,
        car.year,
        car.color,
        car.sold,
        
    ]);

    res.jsonp({
        status: "ok"
    });
}));

routes.delete("/", asyncHandler(async (req, res) => {
    let car = req.body;

    await pool.query("SELECT DELETE_CAR($1)", [
        car.id
    ]);

    res.json({
        status: "ok"
    });
}));

routes.post("/image/", (req, res) => {
    console.log(req.files);
});

export default routes;