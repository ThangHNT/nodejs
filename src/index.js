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
        getTimestamp(date) {
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year  = date.getFullYear();
            if(month < 10) month = '0'+ month;
            if(day < 10) day = '0' + day;
            return `${day}/${month}/${year}`;
        },
        dateofbirth(dob){
            var day = dob.getDate();
            var month = dob.getMonth() + 1;
            var year  = dob.getFullYear();
            if(month < 10) month = '0'+ month;
            if(day < 10) day = '0' + day.toString;
            return ` ${day}/${month}/${year}`;
        },
        dateOfBirth_2(dob){
            var day = dob.getDate();
            var month = dob.getMonth() + 1;
            var year  = dob.getFullYear();
            if(month < 10) month = '0'+ month;
            if(day < 10) day = '0' + day.toString;
            return `${year}-${month}-${day}`;
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