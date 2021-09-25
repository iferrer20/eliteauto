import { Router } from 'express';
import { asyncHandler, RequestException } from '../../exception';
import pool from '../../db-pool';

const routes = Router();

routes.get("/list/", asyncHandler(async (req, res) => {
    res.json(await (await pool.query("SELECT * FROM LIST_MESSAGES()")).rows);
}));

routes.post("/seen/", asyncHandler(async (req, res) => {
    const { message } = req.body;
    await pool.query("SELECT SEEN_MESSAGE($1)", [
        message
    ]);

    res.end();
}));

routes.delete("/", asyncHandler(async (req, res) => {
    const { message } = req.body;
    await pool.query("SELECT DELETE_MESSAGE($1)", [
        message
    ]);

    res.end();
}));

export default routes;