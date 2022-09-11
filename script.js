var swiper = new Swiper(".home-slider", {
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    loop:true,
});

class CartItem{
    constructor(name, desc, img, price){
        this.name = name
        this.desc = desc
        this.img=img
        this.price = price
        this.quantity = 1
   }
}

class LocalCart{
    static key = "cartItems"

    static getLocalCartItems(){
        let cartMap = new Map()
     const cart = localStorage.getItem(LocalCart.key)   
     if(cart===null || cart.length===0)  return cartMap
        return new Map(Object.entries(JSON.parse(cart)))
    }

    static addItemToLocalCart(id, item){
        let cart = LocalCart.getLocalCartItems()
        if(cart.has(id)){
            let mapItem = cart.get(id)
            mapItem.quantity +=1
            cart.set(id, mapItem)
        }
        else
        cart.set(id, item)
       localStorage.setItem(LocalCart.key,  JSON.stringify(Object.fromEntries(cart)))
       updateCartUI()
        
    }

    static removeItemFromCart(id){
    let cart = LocalCart.getLocalCartItems()
    if(cart.has(id)){
        let mapItem = cart.get(id)
        if(mapItem.quantity>1)
       {
        mapItem.quantity -=1
        cart.set(id, mapItem)
       }
       else
       cart.delete(id)
    } 
    if (cart.length===0)
    localStorage.clear()
    else
    localStorage.setItem(LocalCart.key,  JSON.stringify(Object.fromEntries(cart)))
       updateCartUI()
    }
}

let shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#cart-btn').onclick = () =>{
    shoppingCart.classList.toggle('active');
    navbar.classList.remove('active');
}

const cartIcon = document.querySelector('.fa-shopping-cart')
const wholeCartWindow = document.querySelector('.shopping-cart')
wholeCartWindow.inWindow = 0
const addToCartBtns = document.querySelectorAll('.add-to-cart-btn')
addToCartBtns.forEach( (btn)=>{
    btn.addEventListener('click', addItemFunction)
}  )

function addItemFunction(e){
    const id = e.target.parentElement.parentElement.getAttribute("data-id")
    const img = e.target.parentElement.previousElementSibling.previousElementSibling.src
    const name = e.target.parentElement.previousElementSibling.children[0].textContent
    const desc = e.target.parentElement.previousElementSibling.children[1].textContent
    let price = e.target.parentElement.previousElementSibling.children[2].textContent
    price = price.replace("/-",'')
    const item = new CartItem(name, desc, img, price)
    LocalCart.addItemToLocalCart(id,item)
    console.log(item)
}


    function updateCartUI(){
        const cartWrapper = document.querySelector('.cart-wrapper')
        cartWrapper.innerHTML=""
        const items = LocalCart.getLocalCartItems()
        if(items === null) return
        let count = 0
        let total = 0
        for(const [key, value] of items.entries()){
            const cartItem = document.createElement('div')
            cartItem.classList.add('cart-item')
            let price = value.price*value.quantity
            price = Math.round(price*100)/100
            count+=1
            total += price
            total = Math.round(total*100)/100
            cartItem.innerHTML =
            `
            
            <img id="lasya1" src="${value.img}" height="100" alt="space">
            <div id="lasya2" class="content1">
                <h3 id="lasya3">${value.name}</h3>
                <p id="lasya4" >${value.desc}</p>
                <span class="price" id="lasya5" >Rs.${price}/-</span>
                <span id="lasya6"class="quantity">qty :${value.quantity}</span>
            </div>
            <i id="lasya7" class="fas fa-trash"></i>
            `
            cartItem.lastElementChild.addEventListener('click', ()=>{
                LocalCart.removeItemFromCart(key)
            })
             cartWrapper.append(cartItem)
        }

        if(count > 0){
            cartIcon.classList.add('non-empty')
            let root = document.querySelector(':root')
            root.style.setProperty('--after-content', `"${count}"`)
            const subtotal = document.querySelector('.subtotal')
            subtotal.innerHTML = `SubTotal: Rs.${total}`
        }
        else
        cartIcon.classList.remove('non-empty')
    }
    document.addEventListener('DOMContentLoaded', ()=>{updateCartUI()})

    function fun() {  
        alert ("Message Sent Succesfully");  
     }  

    function fun1() {  
        window.location.href="index.html";
  alert("Succesfully Signed into your account! Now you can place your order");  
    }  
    function fun2() {  
        window.location.href="index.html";
  alert("Succesfully Registered! Now you can place your order");  
    } 

    let form = document.querySelecter('form');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      return false;
    });