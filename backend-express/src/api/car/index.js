import { Router } from 'express';
import { RequestException, asyncHandler } from '../../exception';
import pool from '../../db-pool';


const routes = Router();

routes.post("/list/", asyncHandler(async (req, res) => {
    
    let brand = parseInt(req.body.brand);
    if (isNaN(brand) || brand < -1) throw new RequestException(400, "Invalid brand");

    let query = await pool.query("SELECT * FROM LIST_CARS($1)", [
        brand
    ]);

    //let brand = parseInt(req.body.page);
    
    // let page = parseInt(req.params.page);
    //if (isNaN(page) || page < 1) throw new RequestException(400, "Invalid page");

    res.json(query.rows);
}));

routes.delete("/:id/", asyncHandler(async (req, res) => {
    
    let id = parseInt(req.params.id);
    if (isNaN(id) || id < 0) throw new RequestException(400, "Invalid car id");
    
    await pool.query("SELECT DELETE_CAR($1)", [
        id
    ]);

    res.json({
        status: "ok"
    });
}));

export default routes;