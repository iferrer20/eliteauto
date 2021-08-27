import express from 'express';
import routes from './api';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/api/", routes);


app.use((err, req, res, next) => {
    // console.log(err.message);
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