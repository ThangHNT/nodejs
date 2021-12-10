const express = require('express')
const app = express()
const port = process.env.PORT || 3000 
const methodOverride = require('method-override');
const path = require('path');
const handlebars = require('express-handlebars');


app.engine('.hbs', handlebars({ 
    extname: '.hbs' ,
    helpers: {
        sum (a,b) { return a + b; },
        getTimestamp (pad) {
            pad = (n,s=2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
            const d = new Date();
            return `${pad(d.getHours())}:${pad(d.getMinutes())} ${pad(d.getDate())}/${pad(d.getMonth()+1)}/${pad(d.getFullYear(),4)}`;
        }
    }
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

app.set('trust proxy', true)

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('home');
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})