const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('./views'));

app.get('/', (req, res) => {
    res.render(index)
});

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
});