import { Router } from 'express';
import { asyncHandler, RequestException } from '../../exception';
import fs from 'fs/promises';
import fsextra from 'fs-extra';
import path from 'path';
import pool from '../../db-pool';

const sessiondir = path.dirname(require.main.filename) + "/../../img/session/";
const carimgdir = path.dirname(require.main.filename) + "/../../img/car/";
const routes = Router();

function checkCar(car) {
    if (!(
        car.brand !== undefined &&
        car.model !== undefined &&
        car.km !== undefined &&
        car.price !== undefined &&
        car.discount !== undefined &&
        car.engine !== undefined &&
        car.horsepower !== undefined && 
        car.fuel !== undefined &&
        car.transmission !== undefined &&
        car.year !== undefined &&
        car.color !== undefined)
    ) {
        throw new RequestException(400, "Some car values are empty");
    }
}
routes.put("/", asyncHandler(async (req, res) => {
    const car = req.body;

    checkCar(car);

    const nimgs = car.image_sid ? (await fs.readdir(sessiondir + car.image_sid)).length : 0;
    const { id } = (await pool.query("SELECT NEW_CAR(($1, $2::VARCHAR(64), $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)::CAR) AS id", [
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
        nimgs
    ])).rows[0];

    if (nimgs > 0) {
        await fs.rename(sessiondir + car.image_sid, carimgdir + id);
    } else {
        await fs.mkdir(carimgdir + id);
    }

    res.end();
    
}));

routes.post("/", asyncHandler(async (req, res) => { // Modify
    const car = req.body;

    checkCar(car);
    await fs.rmdir(carimgdir + car.id, { recursive: true });
    await fs.rename(sessiondir + car.image_sid, carimgdir + car.id);
    const nimgs = (await fs.readdir(carimgdir + car.id)).length;

    await pool.query("SELECT UPDATE_CAR($1, ($2, $3::VARCHAR(64), $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)::CAR)", [
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
        nimgs
    ]);

    res.end();
}));

routes.delete("/", asyncHandler(async (req, res) => {
    const car = req.body;

    await pool.query("SELECT DELETE_CAR($1)", [
        car.id
    ]);

    await fs.rm(carimgdir + car.id, {recursive: true});

    res.end();
}));

setInterval(async () => {
    const sessions = await fs.readdir(sessiondir);
    for (const session of sessions) {
        const { birthtime } = await fs.stat(sessiondir + session);
        const hours = (new Date - birthtime)/1000/60/60;
        if (hours >= 1) {
            await fs.rmdir(sessiondir + session, { recursive: true });
        }
    }
}, (60000)*60); 

routes.put("/image/", asyncHandler(async (req, res) => {
    const imgdir = sessiondir + req.body.image_sid + "/";
    const imgId = (await fs.readdir(imgdir)).length + 1;
    await fs.writeFile(imgdir + imgId + ".jpg", req.files.image.data);

    res.end();
}));

routes.delete("/image/", asyncHandler(async (req, res) => {
    const { id } = req.body;
    const { image_sid } = req.body;
    const imgdir = sessiondir + image_sid + "/";

    if (id && image_sid) {
        const nimgs = (await fs.readdir(sessiondir + image_sid)).length;
        await fs.rm(imgdir + id + ".jpg");
        for (let i=(id+1); i<=nimgs; i++) {
            await fs.rename(imgdir + "/" + i + ".jpg", imgdir + "/" + (i-1) + ".jpg");
        }
    } else if (image_sid) {
        await fs.rm(sessiondir + image_sid, {recursive: true});
    }

    res.end();
}));

routes.get("/image/sid/(:id|)", asyncHandler(async (req, res) => {
    const image_sid = (Math.random() + 1).toString(36).substring(2);

    const { id } = req.params;

    if (id) { // Copy images of car to a new session
        await fsextra.copy(carimgdir + id, sessiondir + image_sid, {recursive: true});
    } else { // Create empty session
        await fs.mkdir(sessiondir + image_sid);
    }

    res.json({
        image_sid
    });
}));

export default routes;