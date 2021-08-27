const { validationResult } = require("express-validator");
const moment = require("moment")
const Order = require("../../../models/order")
function ordercontroller(){
    return{
        store(req,res){
            const {phone , address} = req.body;
        const Error = validationResult(req)

        if(!Error.isEmpty()){
            let err = Error.array()[0].msg;
            return res.render('customer/cart',{error:err,phone:phone,address:address})
        }else{
            const order = new Order({
                customerId: req.user._id,
                items:req.session.cart.items,
                phone: phone,
                address: address

            })
            order.save().then((result)=> {
                Order.populate(result,{path:"customerId"},(err,placedOrder)=> {
                    delete req.session.cart
                    // const eventEmitter = req.app.get('eventEmitter')
                    // eventEmitter.emit('orderUpdated', {placedOrder })
                    res.redirect("/customer/orders")

                })
               
               
            }).catch((err)=> {
                return res.render('customer/cart',{error:err ,success:false , })
                console.log(err)
            })
        }

      
        },
       async index(req,res){
         const order = await Order.find({customerId:req.user._id},null,{sort:{'createdAt':-1}})
         if(order){
            // res.header('Cache-Control', 'no-store')
            res.render('customer/orders',{orders:order, success:'successful', moment: moment }) // moment
         }else{
            res.render('customer/orders',{orders:0, success:false , success: false})
         }
         /// yet to 
        
        }
    }
}


module.exports = ordercontroller ;