import { Router } from 'express';
import { RequestException, asyncHandler } from '../../exception';
import pool from '../../db-pool';

const routes = Router();

routes.post("/", asyncHandler(async (req, res) => {

    const { name, surname, email, message, car } = req.body;
    await pool.query("SELECT NEW_MESSAGE($1, $2, $3, $4, $5)", [
        name,
        surname,
        email,
        message,
        car ? car : null
    ]);

    res.end();
}));

export default routes;