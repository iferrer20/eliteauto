import { Router } from 'express';
import { asyncHandler } from '../../exception';
const routes = Router();


routes.get("/", (req, res) => {
    res.jsonp({
        info: "get"
    });
});

routes.post("/", (req, res) => {
    res.jsonp({
        info: "post"
    });
});

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