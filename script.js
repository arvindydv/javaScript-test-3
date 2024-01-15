const products = [
    {id: 1, name: "Product-1", price:100},
    {id: 2, name: "Product-2", price:200},
    {id: 3, name: "Product-3", price:300},
    
]
const productsContainer = document.querySelector(".products");
const addProductsHtml = () =>{
    
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.setAttribute("class", "product");
        productDiv.innerHTML = `
        <p class="name">${product.name}</p>
        <p class="price">${product.price}</p>
        <div class="btn-container">
            <button class="remove" value="-">-</button>
            <span class="quantity">0</span>
            <button class="add" value="+">+</button>
    </div> `;
    productsContainer.appendChild(productDiv);
    });
}
  
   const cart = [];
   const cartContainer = document.querySelector(".cart");
    
   if(cart.length == 0) {
    const p = document.createElement("p");
    p.innerText = "No products added to the cart.";
    cartContainer.appendChild(p);
   }

   const addToCart = ()=>{
    
     cartContainer.innerHTML = "";
     const h2 = document.createElement("h2");
     h2.innerText = "cart";
     cartContainer.appendChild(h2);

     cart.forEach((cartProduct)=>{
        const productDiv = document.createElement("div");
        productDiv.setAttribute("class", "product");
        
        productDiv.innerHTML = `<div class="product">
        <p class="name" class="pname">${cartProduct.name}</p>
          <p><span class="pquntity">${cartProduct.productCount} x </span> <span class="pprice">${cartProduct.price}</span></p>
        </div>`;
         
        cartContainer.appendChild(productDiv);
        
     })

      //  total price
    let totalPrice  = 0;
    for (let i = 0; i <cart.length; i++) {
     totalPrice+=  cart[i].price*cart[i].productCount;
    }
   const totalPriceDiv =  document.createElement("div");
   totalPriceDiv.setAttribute("class", "product");
   
   totalPriceDiv.innerHTML = `<div class="product">
   <h3 class="name" >Total: </h3>
    <h3> ${totalPrice}</h3>
    
   </div>`;

   cartContainer.appendChild(totalPriceDiv);
     
   }

   const removeToCart = () =>{

    cartContainer.innerHTML = "";
    const h2 = document.createElement("h2");
    h2.innerText = "cart";
    cartContainer.appendChild(h2);

    cart.forEach((cartProduct)=>{
        const productDiv = document.createElement("div");
        productDiv.setAttribute("class", "product");
        
        productDiv.innerHTML = `<div class="product">
        <p class="name" class="pname">${cartProduct.name}</p>
          <p><span class="pquntity">${cartProduct.productCount} x </span> <span class="pprice">${cartProduct.price}</span></p>
        </div>`;
         
        cartContainer.appendChild(productDiv);
        
     });

      //  total price
    let totalPrice  = 0;
    for (let i = 0; i <cart.length; i++) {
     totalPrice+=  cart[i].price*cart[i].productCount;
    }
   const totalPriceDiv =  document.createElement("div");
   totalPriceDiv.setAttribute("class", "product");
   
   totalPriceDiv.innerHTML = `<div class="product">
   <h3 class="name" >Total: </h3>
    <h3> ${totalPrice}</h3>
    
   </div>`;

   cartContainer.appendChild(totalPriceDiv);
    
     if(cart.length == 0) {
        cartContainer.removeChild(totalPriceDiv);
        const p = document.createElement("p");
        p.innerText = "No products added to the cart.";
        cartContainer.appendChild(p);
       }

   }

// add product
const addProduct = (currentQuantity)=>{

   let count = Number(currentQuantity.innerText);
   count++;
   currentQuantity.innerText = count;

//    add to cart
const cartElement = {};
   const productPrice = Number(currentQuantity.parentNode.previousElementSibling.innerText);
     const productName = currentQuantity.parentNode.previousElementSibling.previousElementSibling.innerText;
     
     cartElement.name = productName;
     cartElement.price = productPrice; 
     cartElement.productCount = 1;

     const isValuePresent = cart.some(item => item.name === productName);
     if(isValuePresent){
        const index = cart.findIndex(item => item.name === productName);
        cart[index].productCount++;
     } else{
        cart.push(cartElement);
     }
    
   addToCart();
}

// remove product
const removeProduct = (currentQuantity)=>{

    let count =  Number(currentQuantity.innerText);
    count--;
    currentQuantity.innerText = count;

    // remove to cart
    const productName = currentQuantity.parentNode.previousElementSibling.previousElementSibling.innerText;

        const index = cart.findIndex(item => item.name === productName);

        if(cart[index].productCount>1){
            cart[index].productCount--;
         } else {
            cart.splice(index, 1);
          }
        
       
   

    removeToCart();
}

productsContainer.addEventListener('click', (e)=>{

       if(e.target.value == "+"){
           let currentQuantity = e.target.previousElementSibling
           addProduct(currentQuantity);
       } else if(e.target.value == "-"){
        let currentQuantity = e.target.nextElementSibling;
        if(Number(currentQuantity.innerText)>0){
          removeProduct(currentQuantity);
        }
       }
})


    document.addEventListener('DOMContentLoaded', addProductsHtml);


