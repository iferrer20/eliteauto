import { Router } from 'express';
import car from './car';
import { RequestException, asyncHandler } from '../../exception';
import pool from '../../db-pool';
import { checkJWT, genJWT } from '../../utils';

const routes = Router();

routes.post("/login/", asyncHandler(async (req, res) => {
    let { username, password } = req.body;
    if (typeof username != 'string' || username.length > 20) throw new RequestException(400, "Invalid username value");
    if (typeof password != 'string' || password.length > 128) throw new RequestException(400, "Invalid password value");

    await pool.query("SELECT ADMIN_LOGIN($1, $2)", [
        req.body.username,
        req.body.password
    ]);

    let token = genJWT({username: username});
    res.cookie("admin_token", token);
    
    res.json({
        status: "ok"
    });
}));

// Check if is admin (middleware)
routes.use("/", (req, res, next) => {
    // Veryify token
    const { admin_token } = req.cookies;
    checkJWT(admin_token);
    next();
});

routes.use("/car/", car);


export default routes;