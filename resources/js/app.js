import axios from 'axios';
import Noty from "noty";
import {initAdmin} from "./admin.js"

let addtocart = document.querySelectorAll(".add-to-cart")
let cartCounter = document.getElementById("cartCounter")

function addtoCart(pizza){
     axios.post('/update-cart', pizza).then((res)=>{
        cartCounter.innerHTML = res.data.totalQty
        
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

// Remove alert message after X seconds
const alertMsg = document.querySelector('#success-alert')
if(alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    }, 2000)
}

initAdmin()

let statuses = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector('#hiddenInput')
let order = hiddenInput ? hiddenInput.value : null
order = JSON.parse(order)
let time = document.createElement('small')

function updateStatus(order) {
    statuses.forEach((status) => {
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepCompleted = true;
    statuses.forEach((status) => {
       let dataProp = status.dataset.status
       if(stepCompleted) {
            status.classList.add('step-completed')
       }
       if(dataProp === order.status) {
            stepCompleted = false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
           if(status.nextElementSibling) {
            status.nextElementSibling.classList.add('current')
           }
       }
    })

}

updateStatus(order);