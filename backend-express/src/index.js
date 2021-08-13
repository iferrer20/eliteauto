import express from 'express';
import routes from './api';

const app = express();
app.use("/api/", routes);

app.listen(80);