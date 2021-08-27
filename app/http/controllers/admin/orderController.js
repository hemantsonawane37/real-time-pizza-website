const Order = require("../../../models/order")

function orderController() {
    return {
        index(req, res) {
           Order.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 }}).populate('customerId', '-password').exec((err, orders) => {
             
               if(req.xhr) {
                   return res.json(orders)
               } else {
                return res.render('admin/order')
               }
           })
        },
        async show(req,res){
            let _id = Object.values(req.params)
           
            const order = await Order.findOne({_id:_id[0]})
           
          // Authorize customer
            
          if(req.user._id.toString() === order.customerId.toString()){
              res.render('customer/singleOrder',{order})
          }else{
              res.redirect("/")
          }
         }
    
    }
}

module.exports = orderController