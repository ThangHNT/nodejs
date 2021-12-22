const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const methodOverride = require('method-override');
const route = require('./routes/main.js');
const fbAuthentication = require('./middleware/facebookAuthentication.js');
const ggAthentication = require('./middleware/googleAuthentication.js');
const path = require('path');
const handlebars = require('express-handlebars');
const upload = require('express-fileupload');


app.engine('.hbs', handlebars({
    extname: '.hbs',
    helpers: {
        sum(a, b) { return a + b; },
        getTimestamp(pad) {
            pad = (n, s = 2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
            const d = new Date();
            return `${pad(d.getHours())}:${pad(d.getMinutes())} ${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${pad(d.getFullYear(), 4)}`;
        }
    }
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(upload());

// connect to db
// const mongoose = require('mongoose');
// async function connect() {
//     try {
//         await mongoose.connect('mongodb://localhost:27017/practice');
//         console.log('Connect successfully');
//     } catch (error) {
//         console.log('connection failed');
//     }
// }
// connect();
//-----------------------------------------------

fbAuthentication(app);
ggAthentication(app);
route(app);
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})