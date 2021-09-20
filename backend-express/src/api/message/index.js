import { Router } from 'express';
import { RequestException, asyncHandler } from '../../exception';
import pool from '../../db-pool';

const routes = Router();

routes.post("/", asyncHandler(async (req, res) => {

    const { name, surname, email, message } = req.body;
    await pool.query("SELECT NEW_MESSAGE($1, $2, $3, $4)", [
        name,
        surname,
        email,
        message
    ]);

    res.end();
}));

export default routes;