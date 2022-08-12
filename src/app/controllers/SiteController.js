const Course = require('../models/Course')
const Users =require('../models/Users')
const jwt =require('jsonwebtoken')
class SiteController {
    //[get] /
    index(req,res,next){
        let perPage = 3; // số lượng sản phẩm xuất hiện trên 1 page
        let page = req.params.page || 1; 
        Course.find({}).lean().populate({path:'author'})
            .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
            .limit(perPage)
            .exec((err,courses)=>{
                Course.countDocuments((err, count) => { // đếm để tính có bao nhiêu trang
                    if (err) return next(err);
                    res.render('home', {
                        courses, // sản phẩm trên một page
                        current: page, // page hiện tại
                        pages: Math.ceil(count / perPage) // tổng số các page
                    });
                  });
            })
    }
    //[get] /search
    search(req,res){
        let perPage = 4; // số lượng sản phẩm xuất hiện trên 1 page
        let page = req.params.page || 1; 
        Course.find({title:{$regex:req.query.key}}).lean().populate({path:'author'})
            .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
            .limit(perPage)
            .exec((err,courses)=>{
                Course.countDocuments((err, count) => { // đếm để tính có bao nhiêu trang
                    if (err) return next(err);
                    res.render('search', {
                        courses, // sản phẩm trên một page
                        current: page, // page hiện tại
                        pages: Math.ceil(count / perPage) // tổng số các page
                    });
                  });
            })
    }
}
module.exports =new SiteController
