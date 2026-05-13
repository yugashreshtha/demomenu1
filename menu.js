let cart =
  JSON.parse(localStorage.getItem('cart')) || [];

function saveCart(){

  localStorage.setItem(
    'cart',
    JSON.stringify(cart)
  );

}

function updateCartUI(){

  const cartItems =
    document.getElementById('cart-items');

  const cartCount =
    document.getElementById('cart-count');

  const sidebarCount =
    document.getElementById('sidebar-count');

  const cartTotal =
    document.getElementById('cart-total');

  const mobileCount =
    document.getElementById('mobile-count');

  const mobileTotal =
    document.getElementById('mobile-total');

  const total =
    cart.reduce((sum,item)=>sum+item.price,0);

  if(cartCount){
    cartCount.innerText = cart.length;
  }

  if(sidebarCount){
    sidebarCount.innerText =
      `${cart.length} Items`;
  }

  if(cartTotal){
    cartTotal.innerText = total;
  }

  if(mobileCount){
    mobileCount.innerText =
      `${cart.length} Items`;
  }

  if(mobileTotal){
    mobileTotal.innerText = total;
  }

  if(cartItems){

    cartItems.innerHTML = '';

    if(cart.length===0){

      cartItems.innerHTML =
        'No items selected.';

    }

    cart.forEach((item,index)=>{

      cartItems.innerHTML += `
      
        <div class="cart-item">

          <div>

            <h4>
              ${item.name}
            </h4>

            <p>
              ₹${item.price}
            </p>

          </div>

          <button
            class="remove-btn"
            onclick="removeItem(${index})"
          >
            Remove
          </button>

        </div>

      `;

    });

  }

}

function addToCart(name,price){

  cart.push({
    name,
    price
  });

  saveCart();

  updateCartUI();

}

function removeItem(index){

  cart.splice(index,1);

  saveCart();

  updateCartUI();

}

updateCartUI();