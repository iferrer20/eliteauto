import express from 'express';
import routes from './api';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

const app = express();

/* -- Middlewares -- */
app.use(cookieParser());
app.use(express.json());
app.use(fileUpload());

/* -- Routing -- */
app.use("/api/", routes);


/* -- Error handling -- */
app.use((err, req, res, next) => {
    if (err.code < 500) {
        res.status(err.code);
    } else if(err.code == 45000) { 
        res.status(400);
    } else {
        res.status(500);
    }
    res.json({ error: err.message });
    res.end(); 
});

app.listen(80);