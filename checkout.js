let cart =
  JSON.parse(localStorage.getItem('cart')) || [];

/* FOOD IMAGES */

const foodImages = {

  "Smoky Burger":
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1998&auto=format&fit=crop",

  "Fire Pizza":
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop",

  "Creamy Pasta":
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1974&auto=format&fit=crop"

};

/* UPDATE CHECKOUT UI */

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

  /* EMPTY CART */

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

  /* SHOW ITEMS */

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
              Premium handcrafted dish
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

/* REMOVE ITEM */

function removeItem(index){

  cart.splice(index,1);

  localStorage.setItem(
    'cart',
    JSON.stringify(cart)
  );

  updateCheckout();

}

/* PLACE ORDER */

function placeOrder(){

  const customerName =
    document.getElementById('customer-name').value;

  const tableNumber =
    document.getElementById('table-number').value;

  const notes =
    document.getElementById('notes').value;

  /* VALIDATION */

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

  /* CREATE ORDER TEXT */

  let orderList = '';

  cart.forEach((item)=>{

    orderList +=
      `${item.name} - ₹${item.price}\n`;

  });

  /* SEND EMAIL */

  emailjs.send(

    service_f8z9fmd,

    template_h9vv02q,

    {
      customer_name: customerName,
      table_number: tableNumber,
      order: orderList,
      notes: notes
    }

  )

  /* SUCCESS */

  .then(()=>{

    /* SAVE FOR INVOICE */

    localStorage.setItem(
      'lastOrder',
      JSON.stringify(cart)
    );

    /* REDIRECT */

    window.location.href =
      'thankyou.html';

  })

  /* ERROR */

  .catch((error)=>{

    alert(
      'Failed to send order.'
    );

    console.log(error);

  });

}

/* INITIAL LOAD */

updateCheckout();
