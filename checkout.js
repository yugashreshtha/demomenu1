let cart =
  JSON.parse(localStorage.getItem('cart')) || [];

/* IMAGES */

const foodImages = {

  "Smoky Burger":
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1998&auto=format&fit=crop",

  "Fire Pizza":
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop",

  "Creamy Pasta":
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1974&auto=format&fit=crop"

};

function saveCart(){

  localStorage.setItem(
    'cart',
    JSON.stringify(cart)
  );

}

function updateCheckout(){

  const checkoutItems =
    document.getElementById('checkout-items');

  const checkoutTotal =
    document.getElementById('checkout-total');

  const itemCount =
    document.getElementById('item-count');

  const total =
    cart.reduce((sum,item)=>sum+item.price,0);

  itemCount.innerText =
    cart.length;

  checkoutTotal.innerText =
    total;

  checkoutItems.innerHTML = '';

  if(cart.length===0){

    checkoutItems.innerHTML = `
    
      <div class="checkout-item">

        <div class="item-info">

          <h3>
            Your cart is empty.
          </h3>

          <p>
            Add dishes from the menu first.
          </p>

        </div>

      </div>

    `;

    return;

  }

  cart.forEach((item,index)=>{

    checkoutItems.innerHTML += `
    
      <div class="checkout-item">

        <div class="item-left">

          <img
            src="${foodImages[item.name]}"
            alt=""
          />

          <div class="item-info">

            <h3>
              ${item.name}
            </h3>

            <p>
              Premium handcrafted dish.
            </p>

          </div>

        </div>

        <div class="item-right">

          <div class="item-price">
            ₹${item.price}
          </div>

          <button
            class="remove-btn"
            onclick="removeItem(${index})"
          >
            Remove
          </button>

        </div>

      </div>

    `;

  });

}

function removeItem(index){

  cart.splice(index,1);

  saveCart();

  updateCheckout();

}

function placeOrder(){

  const customerName =
    document.getElementById('customer-name').value;

  const tableNumber =
    document.getElementById('table-number').value;

  const notes =
    document.getElementById('notes').value;

  if(
    !customerName ||
    !tableNumber ||
    cart.length===0
  ){

    alert(
      'Please complete all required fields.'
    );

    return;

  }

  let orderText =
    `Customer Name: ${customerName}%0D%0A`;

  orderText +=
    `Table Number: ${tableNumber}%0D%0A%0D%0A`;

  orderText +=
    `Order Items:%0D%0A`;

  cart.forEach((item)=>{

    orderText +=
      `- ${item.name} (₹${item.price})%0D%0A`;

  });

  orderText +=
    `%0D%0AInstructions:%0D%0A${notes}`;

  /* SAVE ORDER */

  localStorage.setItem(
    'lastOrder',
    JSON.stringify(cart)
  );

  /* OPEN EMAIL */

  window.open(
    `mailto:dasyug91@gmail.com?subject=New Premium Restaurant Order&body=${orderText}`
  );

  /* CLEAR CART */

  localStorage.removeItem('cart');

  /* REDIRECT */

  setTimeout(()=>{

    window.location.href =
      'thankyou.html';

  },500);

}

  let orderText =
    `Customer Name: ${customerName}%0D%0A`;

  orderText +=
    `Table Number: ${tableNumber}%0D%0A%0D%0A`;

  orderText +=
    `Order Items:%0D%0A`;

  cart.forEach((item)=>{

    orderText +=
      `- ${item.name} (₹${item.price})%0D%0A`;

  });

  orderText +=
    `%0D%0AInstructions:%0D%0A${notes}`;

localStorage.setItem(
  'lastOrder',
  JSON.stringify(cart)
);

window.location.href =
  `mailto:dasyug91@gmail.com?subject=New Premium Restaurant Order&body=${orderText}`;

setTimeout(()=>{

  localStorage.removeItem('cart');

  window.location.href =
    'thankyou.html';

},1000);

}

updateCheckout();
