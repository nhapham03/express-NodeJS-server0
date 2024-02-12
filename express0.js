import express from 'express';

const app = express();
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
    res.type('text/plain');
    res.send("Hello World");
});

app.get('/about', (req, res) => {
    res.type('text/plain');
    res.send("About Page");
});

//foo
app.get('/foo', (req, res, next) => {
    const randomResponse = Math.random() < 0.5 ? "sometimes this" : next();
    res.type('text/plain');
    res.send(randomResponse);
});

app.get('/foo', (req, res) => {
    res.type('text/plain');
    res.send("and sometimes that");
});

//username
app.get(/^\/user(name)?$/, (req, res) => {
    res.type('text/plain');
    res.send("User Route");
});

// Route with a parameter in its path
app.get('/user/:username', (req, res) => {
    const username = req.params.username;
    const responseMessage = `Hello ${username}`;
    res.type('text/plain');
    res.send(responseMessage);
});

// Get route that handles query strings
app.get('/get', (req, res) => {
    const queryParams = req.query;
    console.log("Query String Parameters:", queryParams);
    res.send("Query String Parameters logged to console");
});

app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send("404 - Not Found");
})

app.listen(app.get('port'), ()=> {
    console.log("Express Server is Running");
});