const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')

app.use(express.static(path.join(__dirname, 'views')));
app.set('views', __dirname, '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost:27017/TestDB', { useNewUrlParser: true, useUnifiedTopology: true }, (err)=> {
    if(!err) console.log('Db connected');
    else console.log('db error');
})

const NewSchema = new mongoose.Schema({
    email: String,
    password: String
})

const newModel = new mongoose.model("Collection", NewSchema)

app.get('/', (req, res) => {
    res.render(index)
});

app.post('/sign-up', (req, res) => {
    const data = new newModel({ email: req.body.email, password: req.body.password});
    data.save();
    res.send(`Welcome ${req.body.email}`)
})

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
});