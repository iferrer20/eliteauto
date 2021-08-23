import express from 'express';
import routes from './api';

const app = express();

app.use(express.json());
app.use("/api/", routes);


app.use((err, req, res, next) => {
    // console.log(err.message);
    if (err.code < 500) {
        res.status(err.code);
    } else if(err.code == 45000) {
        res.status(400);
    }
    res.json({ error: err.message });
    res.end();
    
});


app.listen(80);