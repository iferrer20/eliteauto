import express from 'express';

const app = express();

app.get("/", (req, res) => {
    res.jsonp({
        message: "Hello world!"
    });
});

app.listen(8000);
