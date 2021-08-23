import axios from 'axios';
import Noty from "noty";

let addtocart = document.querySelectorAll(".add-to-cart")
let cartCounter = document.getElementById("cartCounter")

function addtoCart(pizza){
     axios.post('/update-cart', pizza).then((res)=>{
        cartCounter.innerHTML = res.data.totalQty
        console.log(res)
        new Noty({
            type: 'success',
            timeout: 1000,
            text: "Item add to Cart"
          }).show();
          
     }).catch((err)=> {
        new Noty({
            type: 'error',
            timeout: 1000,
            text: "Somthing went Wrong"
          }).show();
     })
}

addtocart.forEach((btn)=> {
    btn.addEventListener("click",(e)=> {
        //console.log(e)
        let pizza = btn.dataset.pizza 
        let pizzas = JSON.parse(pizza)
        addtoCart(pizzas)      
    })

})