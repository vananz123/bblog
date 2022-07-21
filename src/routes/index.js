const siteController =require('./site')
const courseController =require('./courses')
const meController =require('./me')
const usersController=require('./users')
const middleware = require('../utils/middleware')
function route(app){
    // Home search
    app.use('/user',middleware.self,usersController)
    app.use('/me',middleware.self,meController)
    app.use('/course',middleware.self,courseController)
    app.use('/',siteController)
   
}
module.exports =route