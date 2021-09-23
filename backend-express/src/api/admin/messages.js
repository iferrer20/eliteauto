import { Router } from 'express';
import { asyncHandler, RequestException } from '../../exception';
import pool from '../../db-pool';

const routes = Router();

routes.get("/", asyncHandler(async (req, res) => {
    res.json(await (await pool.query("SELECT * FROM contact_messages")).rows);
}));

export default routes;