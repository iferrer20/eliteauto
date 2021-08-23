import { Router } from 'express';
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

routes.delete("/", (req, res) => {
    res.jsonp({
        info: "delete"
    });
});

export default routes;