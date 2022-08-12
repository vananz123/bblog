const path =require('path')
const express=require('express')
const hbs  = require('express-handlebars')
const PORT = process.env.PORT || 5000;
const app = express();
const route =require('./routes')
const db=require('./config/db')
const methodOverride = require('method-override')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const jwt =require('jsonwebtoken')
const Users =require('./app/models/Users')
require('dotenv').config()
app.engine('hbs', hbs.engine({
  extname: ".hbs",
  helpers: {
    sum(a,b){ return a+b;},
    fullname(a,b){ return a+' '+ b;},
    checkIdEdit:(a)=>{
      return `wewe`
    }
  },
  partialsDir:path.join(__dirname,'resources', 'views','partials')
}));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({
  extended:true
}));
app.use(express.json())
app.use(cookieParser())
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
// connect db
db.connectDB()
const cloudinary = require('cloudinary')
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret:process.env.API_SECRET,
  secure: false
})
//middeware trả user ra all view cần fix lôi bảo mật password 
//cais nay se chay dau tien
app.use(function(req, res, next) {
  app.locals.user =null
  try{
    var token =req.session.checkLogin
    const iduser =jwt.verify(token,'mk')
    if(iduser){
      
      Users.findById(iduser).lean()
        .then(data=>{
            app.locals.user =data;
            return next()
        })
        .catch(next)
    }
  }catch{
      return next()
  }
})

route(app);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})




