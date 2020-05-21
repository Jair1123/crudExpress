const path = require('path'); //Modulo para entrar a la carpeta views
const express = require('express');
const morgan =  require('morgan');
const mongoose = require('mongoose');
const app =  express();

//Connecting to db
mongoose.connect('mongodb://localhost/crud-mongo',{useNewUrlParser:true})
    .then(db => console.log('Db connected'))
    .catch(err => console.log(err))


//IMporting routes
const indexRoutes = require('./routes/index');

//SETTINGS
app.set('port',process.env.PORT || 3000);
// Asi lo podriamos llamar en linux pero en windows es diferente
// app.set('views',__dirname + '/views'); entonces utilizamos la de abajo
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs'); //linea para entender los ejs es un motor de plantillas

//MIDDLEWARES
//Estos se ejecutan antes de llegar a las rutas 
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}))

//Routes
app.use('/',indexRoutes)


//Starting server
app.listen(app.get('port'),() => {
    console.log('server on port',app.get('port'))
})