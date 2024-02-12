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
// Route using regular expression to match multiple URL patterns
app.get(/^\/user(name)?$/, (req, res) => {
    res.type('text/plain');
    res.send("User Route");
});


app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send("404 - Not Found");
})

app.listen(app.get('port'), ()=> {
    console.log("Express Server is Running");
});