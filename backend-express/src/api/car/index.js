import { Router } from 'express';
import { RequestException, asyncHandler } from '../../exception';
import pool from '../../db-pool';


const routes = Router();

routes.post("/list/", asyncHandler(async (req, res) => {
    let brand = req.body.brand;
    brand = brand == 'all' ? null : brand;
    console.log(brand);
    let query = await pool.query("SELECT id, (car).* FROM LIST_CARS($1)", [
        brand
    ]);

    res.json(query.rows);
}));

routes.get("/list/", asyncHandler(async (req, res) => {
    let query = await pool.query("SELECT id, (car).* FROM LIST_CARS(NULL)");
    res.json(query.rows);
}));

routes.get("/:id/", asyncHandler(async (req, res) => {
    
    let id = parseInt(req.params.id);
    if (isNaN(id) || id < 0) throw new RequestException(400, "Invalid car id");
    
    let query = await pool.query("SELECT * FROM GET_CAR($1)", [
        id
    ]);

    res.json(query.rows[0]);
}));


export default routes;