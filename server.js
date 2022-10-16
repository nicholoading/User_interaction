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
    const email = req.body.email;
    newModel.find({ email: email }, (err,user) => {
        try {
            if (email === user[0].email) {
                return res.send("User already exist. Log in instead.")
            }
        } catch (err) {
            const data = new newModel({ email: req.body.email, password: req.body.password});
            data.save();
            res.send(`Welcome ${req.body.email}`)
        }
    }
)});

app.post('/log-in', (req, res) => {
    const email = req.body.email;
    const pw = req.body.password;
    newModel.find({ email: email }, (err,user) => {
        try {
            if (email === user[0].email && pw !== user[0].password) {
                res.send('Found the email but password is wrong')
            } else if (email === user[0].email && pw === user[0].password) {
                res.send("Log in successfull")
            }
        } catch (err) {
            res.send("User not found")
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
});