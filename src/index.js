const path =require('path')
const express=require('express')
const hbs  = require('express-handlebars')
const PORT = process.env.PORT || 3000;
const app = express();
const route =require('./routes')
const db=require('./config/db')
const methodOverride = require('method-override')
//const session = require('express-session')
const session = require('cookie-session')
const cookieParser = require('cookie-parser')
const jwt =require('jsonwebtoken')
const Users =require('./app/models/Users')
app.engine('hbs', hbs.engine({
  extname: ".hbs",
  helpers: {
    sum(a,b){ return a+b;},
    fullname(a,b){ return a+' '+ b;}
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
db.connectdb()

//middeware trả user ra all view cần fix lôi bảo mật password 
app.use(function(req, res, next) {
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
  next()
})
route(app);


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})





