const express = require('express')
const app = express()
const port = process.env.PORT || 3000 
const path = require('path');
const handlebars = require('express-handlebars');


app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home');
});

// app.get('/', (req, res) => {
//     var home = path.join(__dirname,'home.html');
//     res.sendFile(home);
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})